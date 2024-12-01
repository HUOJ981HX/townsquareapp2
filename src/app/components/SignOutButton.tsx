
import { signOutAction } from "@/actions/authenticate.action"

function SignOutButton() {
  return (
    <div> 
        <button onClick={signOutAction}>Logout</button>
    </div>
  )
}

export default SignOutButton