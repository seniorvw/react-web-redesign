import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

import * as Styles from "../../Util/Styles";
import * as Terms from "../../Assets/Terms";

import { ITermsDisclaimerState } from "./TermsDisclaimer.props";

class TermsDisclaimer extends Component<{}, ITermsDisclaimerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    const { show } = this.state;

    const handleClose = () => this.setShow(false);
    const handleShow = () => this.setShow(true);

    return (
      <div className="container-fluid copyRightBar">
        <div className="row">
          <div className="col-lg-12">
            <p>Copyright 2020 <span>TXTR</span> All Right Reserved</p>
            <p>By using this site, you agree to our <span onClick={handleShow}> Terms and Conditions </span> </p>
          </div>
        </div>
        <Modal style={{ zIndex: 1060 }} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Terms of Use</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderTerms()}
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  private setShow = (shouldShow: boolean) => {
    this.setState({
      show: shouldShow
    });
  }

  private renderTerms(): JSX.Element {
    return (
      <div style={{ height: "500px", overflowY: "scroll", fontSize: "smaller", fontFamily: Styles.Fonts.default }} >
        {Terms.Header}
        <br /><br />
        <ol>
          {/* Section 1 */}
          <li>
            <strong>Privacy Policy.</strong> {Terms.Section1}
          </li>
          {/* Section 2 */}
          <li>
            <strong>General Site Description; Disclaimer; Risks.</strong>
            <ol>
              <li>
                {Terms.Section2_1}
              </li>
              <li>
                {Terms.Section2_2}
              </li>
              <li>
                {Terms.Section2_3}
              </li>
            </ol>
          </li>
          {/* Section 3 */}
          <li>
            <strong>Materials and Services.</strong> {Terms.Section3}
          </li>
          {/* Section 4 */}
          <li>
            <strong>License.</strong> {Terms.Section4}
          </li>
          {/* Section 5 */}
          <li>
            <strong>Restrictions; Removal.</strong> {Terms.Section5}
          </li>
          {/* Section 6 */}
          <li>
            <strong>Amendments to TOU and Privacy Policy.</strong> {Terms.Section6}
          </li>
          {/* Section 7 */}
          <li>
            <strong>Registration and Passwords.</strong>
            <ol>
              <li>
                {Terms.Section7_1}
              </li>
              <li>
                {Terms.Section7_2}
              </li>
            </ol>
          </li>
          {/* Section 8 */}
          <li>
            <strong>Account Information and Data.</strong>
            <ol>
              <li>
                {Terms.Section8_1}
              </li>
              <li>
                {Terms.Section8_2}
              </li>
              <li>
                {Terms.Section8_3}
              </li>
            </ol>
          </li>
          {/* Section 9 */}
          <li>
            <strong>Ownership.</strong> {Terms.Section9}
          </li>
          {/* Section 10 */}
          <li>
            <strong>Marks and Logos.</strong> {Terms.Section10}
          </li>
          {/* Section 15 */}
          <li>
            <strong>Third Party Sites and Materials.</strong>
            <ol>
              <li>
                {Terms.Section11_1}
              </li>
              <li>
                {Terms.Section11_2}
              </li>
            </ol>
          </li>
          {/* Section 12 */}
          <li>
            <strong>Third Party Transactions.</strong> {Terms.Section12}
          </li>
          {/* Section 13 */}
          <li>
            <strong>Your Additional Responsibilities.</strong> {Terms.Section13}
          </li>
          {/* Section 14 */}
          <li>
            <strong>Compliance with Laws; Prohibited Activities.</strong> {Terms.Section14}
          </li>
          {/* Section 15 */}
          <li>
            <strong>Your Contributions to the Site.</strong>
            <ol>
              <li>
                {Terms.Section15_1}
              </li>
              <li>
                {Terms.Section15_2}
              </li>
              <li>
                {Terms.Section15_3}
              </li>
            </ol>
          </li>
          {/* Section 16 */}
          <li>
            <strong>Indemnification.</strong> {Terms.Section16}
          </li>
          {/* Section 17 */}
          <li>
            <strong>DISCLAIMER OF WARRANTIES.</strong>
            <ol>
              <li>
                {Terms.Section17_1}
              </li>
              <li>
                {Terms.Section17_2}
              </li>
              <li>
                {Terms.Section17_3}
              </li>
              <li>
                {Terms.Section17_4}
              </li>
            </ol>
          </li>
          {/* Section 18 */}
          <li>
            <strong>LIMITATION OF LIABILITY AND ACTIONS.</strong> {Terms.Section18}
          </li>
          {/* Section 19 */}
          <li>
            <strong>Export.</strong>
            <ol>
              <li>
                {Terms.Section19_1}
              </li>
              <li>
                {Terms.Section19_2}
              </li>
            </ol>
          </li>
          {/* Section 20 */}
          <li>
            <strong>Term and Termination.</strong>
            <ol>
              <li>
                {Terms.Section20_1}
              </li>
              <li>
                {Terms.Section20_2}
              </li>
              <li>
                {Terms.Section20_3}
              </li>
            </ol>
          </li>
          {/* Section 21 */}
          <li>
            <strong>Michigan Law and Jurisdiction.</strong> {Terms.Section21}
          </li>
          {/* Section 22 */}
          <li>
            <strong>Notice and Procedure for Making Claims of Copyright Infringement.</strong>
            <ol>
              <li>
                {Terms.Section22_1}
              </li>
              <li>
                {Terms.Section22_2}
                <ol>
                  <li>
                    {Terms.Section22_2_a}
                  </li>
                  <li>
                    {Terms.Section22_2_b}
                  </li>
                  <li>
                    {Terms.Section22_2_c}
                  </li>
                  <li>
                    {Terms.Section22_2_d}
                  </li>
                  <li>
                    {Terms.Section22_2_e}
                  </li>
                  <li>
                    {Terms.Section22_2_f}
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          {/* Section 23 */}
          <li>
            <strong>Severability.</strong> {Terms.Section23}
          </li>
          {/* Section 24 */}
          <li>
            <strong>Waiver.</strong> {Terms.Section24}
          </li>
          {/* Section 25 */}
          <li>
            <strong>Relationship.</strong> {Terms.Section25}
          </li>
        </ol>
      </div>
    );
  }
}

export default TermsDisclaimer;
