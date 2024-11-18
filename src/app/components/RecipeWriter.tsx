"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RecipeWriter = () => {
 
  const [garnishing, setGarnishing] = useState<string>("");

  
  const handleGarnishingChange = (value: string) => {
    setGarnishing(value);
  };

  const [recipe, setRecipe]= useState<string>("")

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

       
        <Button disabled={!recipe || !garnishing} className="w-full" size="lg">Let's Cook</Button>
      </section>
    </div>
  );
};

export default RecipeWriter;
