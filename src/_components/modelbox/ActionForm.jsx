import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import TimePicker from 'react-bootstrap-time-picker';
import { Modal } from "react-bootstrap";

const ActionForm = (props) => {

  return (
    <>

      {/* Confirm Modal */}
      {/* <div id="confirm_modal" className="modal custom-modal fade" role="dialog"> */}
      <Modal show={props.isStatusModalShow} dialogClassName="custom-modal1">
        {/* <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          > */}
        <div className="modal-content text-left">
          <div className="modal-header" style={{ textAlign: 'left' }}>
            {/* <h5 className="modal-title text-xl">Action Form</h5> */}
            <div>
              Confimation
            </div>
            <button
              type="button"
              className="close"
              onClick={() => {
                props.setIsStatusModalShow(false)
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" style={{ textAlign: 'left' }}>


            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="col-form-label">
                    Are you sure you want to continue?
                  </label>

                </div>
              </div>
            </div>
            <div className="submit-section pull-right">
              <button type="submit" className="btn btn-primary submit-btn1 btn-sm1" onClick={() => {
                props.confirmYes(props.selectedType);
              }}>Yes</button>
              <button type="button" onClick={() => {
                props.setIsStatusModalShow(false)
              }} className="btn btn-default">No</button>
            </div>

          </div>
        </div>
        {/* </div> */}
      </Modal>
      {/* </div> */}
      {/* /Confirm Modal */}
      {/* Add Employee Modal */}
      <Modal show={props.isActionStatusModalShow}>
        {/* <div id="Action_Form" className="modal custom-modal fade" role="dialog"> */}
        {/* <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          > */}
        <div className="modal-content text-left">
          <div className="modal-header">
            <h5 className="modal-title text-xl">{props.selectedType}</h5>
            <button
              type="button"
              className="close"
              onClick={() => props.setIsActionStatusModalShow(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" style={{ textAlign: 'left' }}>
            <form onSubmit={(e) => { e.preventDefault(); props.submitForm(props.selectedType) }}>
              {
                props.selectedType === 'Offer Sent' ?
                  <>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <label>
                          Send Offer
                        </label>
                        <input type='text' className="form-control" required onChange={(e) => {

                          props.setOffer(e.target.value);
                        }} />
                      </div>

                    </div>

                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">Submit</button>
                    </div>
                  </>
                  :
                  <>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label>
                          Set Date
                        </label>
                        <Form.Control type="date" required onChange={(e) => {

                          props.setOffer(e.target.value);
                        }} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label>
                          Set Time
                        </label>
                        <Form.Control type="time" step="0" required onChange={(e) => {

                          props.setInterviewTime(e.target.value);
                        }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Description
                          </label>
                          <textarea className="form-control" rows="10" style={{ height: '100%' }} onChange={(e) => {

                            props.setInterviewDesc(e.target.value);
                          }} required></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">Submit</button>
                    </div>
                  </>
              }

            </form>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Modal>
      {/* /Add Employee Modal */}
    </>
  )
}

export default ActionForm