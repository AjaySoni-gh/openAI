"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Frame } from "@gptscript-ai/gptscript";
import renderEventMessage from "@/lib/renderEventMessage";
const recipePath= "public/stories";

const RecipeWriter = () => {
 
  const [garnishing, setGarnishing] = useState<string>("");
  const handleGarnishingChange = (value: string) => {
    setGarnishing(value);
  };
  const [progress, setProgress]= useState("")
  const [runStarted, setRunStarted]= useState<boolean>(false)
  const [runFinished, setRunFinished]= useState<boolean | null>(null);
  const [currentTool, SetCurrentTool]= useState("")
  const [recipe, setRecipe]= useState<string>("")
const[ events, setEvents]= useState<Frame[]>([])



  async function runScript(){
       setRunStarted(false)
      setRunFinished(true)

      const response = await fetch('/api/run-script',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'},
          body: JSON.stringify({recipe, garnishing, path: recipePath})
      })
      if(response.ok && response.body){
//code()
console.log("started")
const reader = response.body.getReader()
const decoder= new TextDecoder();
handleStream(reader, decoder);
      }
      else{
        setRunFinished(true)
        setRunStarted(false)
        console.error("failed")
      }
  }
  async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder){
    //stream frm api
    while(true){
      const {done, value}= await reader.read();
      if (done) break;   
      const chunk = decoder.decode(value, {stream: true})

      const eventData = chunk.split("\n\n").filter((line) =>line.startsWith("event: ")).map((line)=> line.replace(/^event /,""));

      eventData.forEach(data =>{
        try { const parsedData=JSON.parse(data);
          if(parsedData.type === "callProgress"){
            setProgress(
              parsedData.output[parsedData.output.length -1].content);
              SetCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type ==="callStart"){
            SetCurrentTool(parsedData.tool?.description || "" )
          }
          else if(parsedData.type ==="runFinish")
          {
            setRunFinished(true);
            setRunStarted(false);
          } else{
            setEvents((prevEvents)=> [...prevEvents, parsedData])
          }
          
        } catch (error) {
          console.error("failed to parse JSON, error", error)
          
        }
      })
    }
  }

  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2">
      
        <Textarea 
        value={recipe}
        onChange={(e)=> setRecipe(e.target.value)}
          className="flex-1 text-black font-semibold"
          placeholder="What would you like to make today?" 
        />

       
        <Select value={garnishing} onValueChange={handleGarnishingChange}>
          <SelectTrigger>
            <SelectValue placeholder="Do you want it to be garnished?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Garnishing: Yes</SelectItem>
            <SelectItem value="no">Garnishing: No</SelectItem>
          </SelectContent>
        </Select>

       
        <Button disabled={!recipe || !garnishing || runStarted} className="w-full" size="lg" 
        onClick={runScript}>
          Let's Cook
          </Button>
      </section>
      <section className="flex-1 pb-5 mt-5">
        <div className="flex flex-col-reverse  bg-gray-500 w-full space-y-2 bg-grey-800 rounded-md trxt-gray-200 font-mono p-10 h-96 overflow-y-auto">
          <div>
            {runFinished === null &&(
              <>
              <p>type something and I will make a step by step  </p>
              <br/>
              </>
            )}
            <span className="mr-5 animate-pulse">{">>"}</span>
            {progress} 
          </div>
          {currentTool && (
            <div className="py-10">
              <span className="mr-5">{"--- [Currnt Tool] ---"}</span>
            </div>
          )}
          //render event
          <div className="space-y-5">
  {events.map((event, index) => (
    <div key={index}>
     <span className="mr-5">{">>"}</span>
     {renderEventMessage(event)}
    </div>
  ))}
</div>

            {runStarted && (
              <div>
                <span className="mr-5 animate-in">
                  started
                </span>
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default RecipeWriter;
