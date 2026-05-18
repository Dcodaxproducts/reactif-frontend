import Design from "./WaitingForApproval/Design"
import Details from "./WaitingForApproval/Details"

const WaitingForApproval = () => {
  return (
      <div className="w-full flex flex-col items-center gap-10 py-8 px-5 md:px-0">
        <Details />
        <Design />
      </div>
  )
}

export default WaitingForApproval
