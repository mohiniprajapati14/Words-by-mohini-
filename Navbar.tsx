"use client";
import { useState } from "react";

export default function Navbar() {
  const [open,setOpen]=useState(false);

  return (
    <div className="glass fixed top-0 w-full p-4 z-50">
      <div className="flex justify-between">
        <div className="gold-text font-bold">WORDS BY MOHINI</div>
        <button onClick={()=>setOpen(!open)}>☰</button>
      </div>
      {open && <div className="text-center">Menu</div>}
    </div>
  );
}
