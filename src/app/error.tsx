
"use client"
export default function Error({error} : any) {
  return (
    <div>
        <p className="font-semibold">{error.code}</p>
        <p>{error.message}</p>
    </div>
  )
}
