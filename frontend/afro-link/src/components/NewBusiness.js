import React, { useState, useEffect } from "react";
import { useInput } from "../util/useInput";
import { getAPI } from "../util/getAPI";
import axios from "axios";
import GoogleMap from "./GoogleMap";
import TimeTable from "./TimeTable";
import "../css/NewBusinss.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const NewBusiness = () => {
  const API = getAPI();
  const [modalShow, setModalShow] = useState(false);

  const biz_name = useInput("");
  const [hours, setHours] = useState("Online Store");
  let time = {
    Mon: "close",
    Tue: "close",
    Wed: "close",
    Thu: "close",
    Fri: "close",
    Sat: "close",
    Sun: "close",
  };
  const owner_name = useInput("");
  const type_name = useInput(""); //add  new function let owner/user create one
  // const phone = useInput("");
  const [phone, setPhone] = useState()
  const email = useInput("");
  const social_media = useInput("");
  const website = useInput("");
  const [houseNum, setHouseNum] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [businessTypes, setBusinessTypes] = useState([]);

  const [showOwner, setShowOwner] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showWeb, setShowWeb] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get("http://localhost:3000/categories/");
        // debugger
        setBusinessTypes(res.data.payload);
      } catch (err) {
        console.log(err);
        setBusinessTypes([]);
      }
    };
    fetchData();
  }, []);

  const types = businessTypes.map((type, i) => {
    // debugger
    return (
      <option value={type.id} key={i}>
        {type.type_name}
      </option>
    );
  });

  const handleNewBiz = async (e) => {
    e.preventDefault();
    try {
      let newBiz = await axios.post(`${API}/businesses`, {
        biz_name: biz_name.value,
        hours: hours,
      });
      if (newBiz.data.status === "success") {
        await axios.post(`${API}/owners`, {
          owner_id: newBiz.data.payload.id,
          owner_name: owner_name.value,
        });

        await axios.post(`${API}/categories`, {
          biz_id: newBiz.data.payload.id,
          type_id: type_name.value,
        });

        await axios.post(`${API}/contacts`, {
          contact_id: newBiz.data.payload.id,
          phone: phone,
          email: email.value,
          social_media: social_media.value,
        });
        await axios.post(`${API}/addresses`, {
          address_id: newBiz.data.payload.id,
          street: houseNum + " " + street,
          city: city,
          state: state,
          zip: zip,
          website: website.value,
        });
      }
    } catch (error) {
      console.log(error.status);
    }
  };

  const handleHours = (e) => {
    // debugger
    if (e.currentTarget.selectedIndex === 0) {
      setHours(e.currentTarget.value);
    } else {
      setModalShow(true);
    }
  };

  const handleOwner = (e) => {
    owner_name.value = e.currentTarget.value; //null
    setShowOwner(!showOwner);
  };
  const handlePhone = (e) => {
    setPhone(e.currentTarget.value); //null
    setShowPhone(!showPhone);
  };
  const handleEmail = (e) => {
    email.value = e.currentTarget.value; //null
    setShowEmail(!showEmail);
  };
  const handleSocial = (e) => {
    social_media.value = e.currentTarget.value; //null
    setShowSocial(!showSocial);
  };
  const handleWeb = (e) => {
    website.value = e.currentTarget.value; //null
    setShowWeb(!showWeb);
  };

  return (
    <div>
      <form className="newBusiness" onSubmit={handleNewBiz}>
        <label>Business Name: </label>
        <input type="text" placeholder="Business Name" required {...biz_name} />

        <label>Hours of Service: </label>
        <select onChange={(e) => handleHours(e)} required>
          <option defaultValue="1">Online Store</option>
          <option defaultValue="2">Add business Hours</option>
        </select>
        <br></br>
        <label>Types Name: </label>
        <select name="Type Name" {...type_name} required>
          <option value="" disabled>
            Select Business Type
          </option>
          {types}
        </select>
        <label>Owner Name: </label>
        <input
          name="Owner Name Input"
          type="text"
          placeholder="John Doe"
          disabled={showOwner}
          {...owner_name}
          required
        />

        <label>If not available</label>
        <input
          name="Owner Name not available check box"
          type="checkbox"
          value="n/a"
          onChange={handleOwner}
        />

        <br></br>
        <label>Contact Number: </label>
        <PhoneInput placeholder="212-345-6789"
          defaultCountry="US"
          disabled={showPhone}
          value={phone} onChange={setPhone} 
          maxLength="14"
          /> 
        {/* <input
          type="tel"
          placeholder="212-345-6789"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          disabled={showPhone}
          {...phone}
          required
        /> */}
        <label>If not available</label>
        <input
          name="Phone not available check box"
          type="checkbox"
          value="n/a"
          onChange={handlePhone}
        />

        <label>Email: </label>
        <input
          type="email"
          placeholder="123@gmail.com"
          {...email}
          disabled={showEmail}
          required
        />
        <label>If not available</label>
        <input
          name="Email not available check box"
          type="checkbox"
          value="NULL"
          onChange={handleEmail}
        />

        <label>Social Media: </label>
        <input
          type="text"
          placeholder="Instagram/Facebook/Twitter"
          {...social_media}
          disabled={showSocial}
          required
        />
        <label>If not available</label>
        <input
          name="Social Media not available check box"
          type="checkbox"
          value="n/a"
          onChange={handleSocial}
        />

        <label>Website: </label>
        <input
          type="text"
          placeholder="exmaple.com/url "
          {...website}
          disabled={showWeb}
          required
        />
        <label>If not available</label>
        <input
          name="Website not available check box"
          type="checkbox"
          value="n/a"
          onChange={handleWeb}
        />

        <div>
          <GoogleMap
            setHouseNum={(e) => setHouseNum(e)}
            setStreet={(e) => setStreet(e)}
            setCity={(e) => setCity(e)}
            setState={(e) => setState(e)}
            setZip={(e) => setZip(e)}
          />
          <div>
            <span className="label">Street address</span>
            <span className="slimField">
              <input
                className="field"
                id="street_number"
                placeholder="House Number"
                defaultValue={houseNum}
              />
            </span>
            <span className="wideField" colSpan="2">
              <input
                className="field"
                id="route"
                placeholder="Street/Route"
                defaultValue={street}
              />
            </span>
          </div>
          <div>
            <span className="label">City</span>
            <span className="wideField" colSpan="3">
              <input
                className="field"
                id="locality"
                placeholder="City"
                defaultValue={city}
              />
            </span>
          </div>
          <div>
            <span className="label">State</span>
            <span className="slimField">
              <input
                className="field"
                id="administrative_area_level_1"
                placeholder="State"
                defaultValue={state}
              />
            </span>
            <span className="label">Zip Code</span>
            <span className="wideField">
              <input
                className="field"
                id="postal_code"
                placeholder="Zip"
                defaultValue={zip}
              />
            </span>
          </div>
        </div>
        <input type="reset" />
        <button type="submit">
          <span>Create Business</span>
        </button>
        <>
          <TimeTable
            show={modalShow}
            onHide={() => setModalShow(false)}
            setTime={() => {
              setHours(time);
            }}
            time={time}
          />
        </>
      </form>
    </div>
  );
};

export default NewBusiness;
