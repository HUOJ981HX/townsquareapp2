
"use client"
export default function Error({error} : any) {

  console.log('sean_log errorerrorerrorerror: ' + JSON.stringify(error));
  return (
    <div>
      <p>handled-------------serverside</p>
        <p className="font-semibold">{error.code}</p>
        <p>{error.message}</p>
    </div>
  )
}
