"use client";
export default function TempComp({postid}: {postid:string}) {

    return (<button onClick={()=>console.log(postid)}>click</button>);
}