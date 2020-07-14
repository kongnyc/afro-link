import React, {useState,useEffect} from 'react'
import {useInput} from "../util/useInput"
import {getAPI} from "../util/getAPI"
import axios from "axios"
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';
import GoogleMap from "./GoogleMap"
const NewBusiness =()=> {

  const API = getAPI();
  const [modalShow, setModalShow] = useState(false);
  
    const biz_name = useInput("")
    const [hours, setHours]= useState("Online Store 24/7")
    let time = {Mon:"close",Tue:"close",Wed:"close",Thu:"close",Fri:"close",Sat:"close",Sun:"close"}
    const owner_name = useInput("")
    const type_name = useInput("") //add  new function let owner/user create one
    const phone = useInput("")
    const email = useInput("")
    const social_media = useInput("")
    const website = useInput("")
    const [houseNum, setHouseNum]= useState("")
    const [street, setStreet]= useState("")
    const [city, setCity]= useState("")
    const [state, setState]= useState("")
    const [zip, setZip]= useState("")

    const [ businessTypes, setBusinessTypes ] = useState([]) 
    
    useEffect(() => {
      const fetchData = async () => {
        
        try{
          let res = await axios.get("http://localhost:3000/categories/");
              // debugger
              setBusinessTypes(res.data.payload);
          } catch (err) {
              console.log(err);
              setBusinessTypes([]);
          }
      }
      fetchData()
  },[])

const types = businessTypes.map((type,i) => {
  // debugger
  return <option value={type.id} key={i}>{type.type_name}</option>
})

    const handleNewBiz = async (e)=>{
      e.preventDefault()
      try {
        let newBiz = await axios.post(`${API}/businesses`, {
          biz_name: biz_name.value,
          hours: hours,
        });
        if(newBiz.data.status==="success"){
          console.log(newBiz.data.payload) 
        }

      } catch (error) {
        alert(error.status)
      }
    }

  // let time = {Mon:"close",Tue:"close",Wed:"close",Thu:"close",Fri:"close",Sat:"close",Sun:"close"}

    const handleInput=(e)=>{
      if(time[e.currentTarget.name]=="close"){
        time[e.currentTarget.name]={open:"",close:""}
        time[e.currentTarget.name][e.currentTarget.id]=e.currentTarget.value
      }else{
        time[e.currentTarget.name][e.currentTarget.id]=e.currentTarget.value
      }
    }
    
    const HourTable= (props)=> {
      // debugger
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Business Hour
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
          <form>
            <h5>select available hour or leave blank for close day</h5>
            <label>Monday:</label>
            <input type="time" id="open" name="Mon" onChange={(e)=>{handleInput(e)}} ></input>
            <input type="time" id="close" name="Mon" onChange={(e)=>{handleInput(e)}} ></input>
            <label>Tuesday:</label>
            <input type="time" id="open" name="Tue" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Tue" onChange={(e)=>{handleInput(e)}}></input>
            <label>Wednesday:</label>
            <input type="time" id="open" name="Wed" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Wed" onChange={(e)=>{handleInput(e)}}></input>
            <label>Thursday:</label>
            <input type="time" id="open" name="Thu" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Thu" onChange={(e)=>{handleInput(e)}}></input>
            <label>Friday:</label>
            <input type="time" id="open" name="Fri" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Fri" onChange={(e)=>{handleInput(e)}}></input>
            <label>Saturday:</label>
            <input type="time" id="open" name="Sat" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Sat" onChange={(e)=>{handleInput(e)}}></input>
            <label>Sunday:</label>
            <input type="time" id="open" name="Sun" onChange={(e)=>{handleInput(e)}}></input>
            <input type="time" id="close" name="Sun" onChange={(e)=>{handleInput(e)}}></input>
          </form>
            <Modal.Footer>
            </Modal.Footer>
            <Button onClick={()=>{props.onHide();props.setTime()}}>Submit Time
            </Button>
          </Modal.Body>
        </Modal>
      );
    }

    const handleHours = (e)=>{
      // debugger
      if(e.currentTarget.selectedIndex===0){
        setHours(e.currentTarget.value)
      }else{
        setModalShow(true)
      }
    }
        return (
          <div>
            <form className="newBusiness" onSubmit={handleNewBiz}>
              <label>Business Name: </label>
              <input type="text" placeholder="Business Name" required {...biz_name} />

              <label>Hour of Service: </label>
              <select onChange={(e)=>handleHours(e)} >
                <option defaultValue="1">Online Store 24/7</option>
                <option defaultValue="2" >add businesses hours</option>
              </select>
              <label>Owner Name: </label>
              <input type="text" placeholder="Owner Name" {...owner_name} />

              <label>Types Name: </label>
              <select name = "Type Name" {...type_name}>
                <option value="">Select Business Type</option>
                    {types}
                </select>

              <label>Contact Number: </label>
              <input type="number" placeholder="Contact Number" {...phone} />

              <label>Email: </label>
              <input type="email" placeholder="Email Address" {...email} />
              <label>Social Media: </label>
              <input type="text" placeholder="Ins/Facebook" {...social_media} />
              <label>Store Page: </label>
              <input type="text" placeholder="Online Website" {...website} />
              <div>
              {/* <GoogleMap props={setCity,setHouseNum,setStreet,setState}/> */}
              <GoogleMap 
              setHouseNum={(e)=>setHouseNum(e)}
              setStreet={(e)=>setStreet(e)}
              setCity={(e)=>setCity(e)}
              setState={(e)=>setState(e)}

              />
                <div>
                  <span className="label">Street address</span>
                  <span className="slimField">
                    <input className="field" id="street_number" placeholder="house number" defaultValue={houseNum}/>
                  </span>
                  <span className="wideField" colSpan="2">
                    <input className="field" id="route" placeholder="street/route" defaultValue={street}/>
                  </span>
                </div>
                <div>
                  <span className="label">City</span>
                  <span className="wideField" colSpan="3">
                    <input className="field" id="locality" placeholder="city" defaultValue={city}/>
                  </span>
                </div>
                <div>
                  <span className="label">State</span>
                  <span className="slimField">
                    <input
                      className="field"
                      id="administrative_area_level_1"
                       placeholder="state"
                       defaultValue={state}
                    />
                  </span>
                  <span className="label">Zip code</span>
                  <span className="wideField">
                    <input className="field" id="postal_code" placeholder="area code"/>
                  </span>
                </div>
              </div>

              <button type="submit">
                <span>Create Business</span>
              </button>
              <>
                <HourTable
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  setTime={()=>{setHours(JSON.stringify(time))}}
                />
              </>
            </form>
          </div>
        );
    }

export default NewBusiness
