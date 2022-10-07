import useWorkoutsContext from "../hooks/useWorkoutsContext"
import {formatDistance,subDays } from 'date-fns'
import useAuthContext from "../hooks/useAuthContext";

function WorkoutDetails({workout}) {
  const {user} = useAuthContext();
  const {dispatch} = useWorkoutsContext();
   const handleClick = async() => {
    if(!user){
      return
    }
   const response =  await fetch('http://localhost:4000/api/workouts/'+ workout._id,{
    method:'DELETE',
    headers:{
      'Authorization':`Bearer ${user.token}`
   }   
   })
    const json = await response.json()

    if(response.ok){
        dispatch({type:'DELETE_WORKOUT',payload:json})
    }
    
   }

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong>{workout.load}</p>
        <p><strong>Reps:</strong>{workout.reps}</p>
        <p>{formatDistance(subDays(new Date(workout.createdAt),0), new Date(), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
   
     </div>
  )
}

export default WorkoutDetails