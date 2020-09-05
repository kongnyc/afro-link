import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BusinessDisplay = ({ userBusinesses }) => {
  let history = useHistory();

  const showBusiness = () => {
    let biznessHours = '';
    if (userBusinesses.length) {
      let allUserBusiness = userBusinesses.map((business, i) => {
        console.log(business);
        return (
          <div key={i}>
            <div id="bizName" className="ownerHeader heavyFont">
              {business.biz_name}
            </div>
            <div className="bizProfileInfo">
              <ul style={{ listStyleType: 'none' }}>
                <li>
                  <img className="bizPicProfile" src={business.pictures} />
                </li>
                <label className="bizLabel">
                  <li className="bizAddress">
                    {business.street} {business.city}
                    {business.state}
                    {business.zip}
                  </li>
                </label>
                <label className="bizLabel">
                  Business Hours:
                  <li className="bizHoursProfile">
                    {business.hours === 'Online Store' ? (
                      <p>Online Business</p>
                    ) : (
                      <details className="hoursDetails">
                        <summary>Hours</summary>
                        {
                          (biznessHours = business.hours.replace(
                            /[^\w\s]/g,
                            ''
                          ))
                        }
                      </details>
                    )}
                  </li>
                </label>

                <label className="bizLabel">
                  Website:
                  <li className="hyperLink">
                    {business.website ? (
                      <a href={business.website} target="_blank">
                        Visit Website
                      </a>
                    ) : (
                      <p className="noneProvided">None Provided</p>
                    )}
                  </li>
                </label>
              </ul>
              <div className="contactInfo">
                <ul>
                  <label className="bizLabel">
                    Phone:
                    <li>
                      {!business.phone || business.phone === 'n/a' ? (
                        <p className="noneProvided">None Provided</p>
                      ) : (
                        business.phone
                      )}
                    </li>
                  </label>
                  <label className="bizLabel">
                    Email:
                    <li>
                      {business.email ? (
                        business.email
                      ) : (
                        <p className="noneProvided">None Provided</p>
                      )}
                    </li>
                  </label>
                  <label className="bizLabel">
                    Social Media Page:
                    <li className="hyperLink">
                      {business.social_media ? (
                        <a href={business.social_media} target="_blank">
                          {business.social_media}
                        </a>
                      ) : (
                        <p className="noneProvided">None Provided</p>
                      )}
                    </li>
                  </label>
                </ul>
                <button
                  className="Btn-rest BtnEdit"
                  onClick={() => {
                    history.push(`/businesses/${business.owner_id}`);
                  }}
                >
                  Visit Business
                </button>
                <button
                  className="Btn-rest BtnEdit"
                  onClick={() =>
                    history.push(`/editbusiness/${business.owner_id}`)
                  }
                >
                  Edit Business
                </button>
              </div>
            </div>
          </div>
        );
      });

      return <div>{allUserBusiness}</div>;
    } else {
      return (
        <div>
          <button
            className="addBizBtn"
            onClick={() => {
              history.push('/newBusiness');
            }}
          >
            Add New Business
          </button>
        </div>
      );
    }
  };

  return <div>{showBusiness()}</div>;
};

export default BusinessDisplay;
