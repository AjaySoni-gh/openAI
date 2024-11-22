import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import {NextRequest} from "next/server";
import {g} from "@/lib/gptScriptinstance"
const script= "src/app/api/run-script/story-book.gpt"

export async function POST(request: NextRequest){
    const{recipe, garnishing, path: recipePath}= await request.json();

    const opts: RunOpts={
        disableCache: true,
        input: '--recipe ${recipe} --garnish ${garnishing} --path ${path}',
        
    };
    try{
        const encoder= new TextEncoder()
        const stream = new ReadableStream({
            async start(controller){
                try{
                    const run =await g.run(script,opts)
                    run.on(RunEventType.Event, (data)=>{ controller.enqueue(encoder.encode('event:${JSON.stringify(data)}\n\n'
                    ))}  )
                    await run.text();
                    controller.close();
                    

                } catch(error){
                    controller.error(error);
                    console.error("Error", error)
                }
            }
        })
        return new Response(stream,{
            headers:{
                "Content-Type":"text/event-stream",
                "Cashe-Control":"no-cashe",
                Connection: "keep-alive",
            },
        })
    } catch(error){
        return new Response(JSON.stringify({error: error})),{
            status:500,
        }
    }
}