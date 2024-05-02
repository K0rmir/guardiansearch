"use client";

import {useApiContext} from "@/context/ApiContext";
import {Dialog} from "primereact/dialog";
import {RadioButton} from "primereact/radiobutton";
import {useState} from "react";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import "../../styles/Articlecitationwindow.css";

export default function ArticleCitationWindow() {
  const {isCitationWindowOpen, setIsCitationWindowOpen, savedArticles} =
    useApiContext();
  const [citationStyle, setCitationStyle] = useState();

  return (
    <>
      <Dialog
        header="Article Citation"
        visible={isCitationWindowOpen}
        style={{width: "50vw"}}
        onHide={() => setIsCitationWindowOpen(false)}>
        <div className="articleCitationContainer">
          <div className="selectCitationStyleContainer">
            <div className="citationStyle1">
              <RadioButton
                inputId="citationStyle1"
                name="harvard"
                value="Harvard"
                onChange={(e) => {
                  setCitationStyle(e.value);
                }}
                checked={citationStyle === "Harvard"}
              />
              <label htmlFor="citationStyle1">Harvard</label>
            </div>
            <div className="citationStyle2">
              <RadioButton
                inputId="citationStyle2"
                name="apa"
                value="APA"
                onChange={(e) => {
                  setCitationStyle(e.value);
                }}
                checked={citationStyle === "APA"}
              />
              <label htmlFor="citationStyle2">APA</label>
            </div>
            <div className="citationStyle3">
              <RadioButton
                inputId="citationStyle3"
                name="mla"
                value="MLA"
                onChange={(e) => {
                  setCitationStyle(e.value);
                }}
                checked={citationStyle === "MLA"}
              />
              <label htmlFor="citationStyle3">MLA</label>
            </div>
          </div>

          <Divider layout="vertical" />
          <Card className="citationBody">
            <p></p>
          </Card>
        </div>
      </Dialog>
    </>
  );
}

// Mahdawi, A. (2024). Oprah’s Ozempic brouhaha shows technology
// advances faster than attitudes. The Guardian. [online] 2 Mar.
// Available at:
// https://www.theguardian.com/commentisfree/2024/mar/02/oprah-ozempic-weight-loss-drug-weightwatchers.
// ‌

// -- Harvard Referencing -- //
// Author Surname, initial. (Year) 'Article title', Website Name(in italics), Date. (day&month) "Available at:" URL (Accessed: Day Month Year)
