"use client";

import {useApiContext} from "@/context/ApiContext";
import {Dialog} from "primereact/dialog";
import {RadioButton} from "primereact/radiobutton";
import {useState, useEffect} from "react";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import "../../styles/Articlecitationwindow.css";
import {fetchUniqueArticleData} from "../../lib/actions";

export default function ArticleCitationWindow({uniqueArticleId}) {
  // recieve unique article id from parent component
  const {isCitationWindowOpen, setIsCitationWindowOpen} = useApiContext();
  const [citationStyle, setCitationStyle] = useState();
  const [uniqueArticle, setUniqueArticle] = useState();
  const [formattedDate, setFormattedDate] = useState();

  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const dateAccessed = `${day}/${month}/${year}`;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const parts = dateString.split("/");
    const day = parts[1];
    const month = parseInt(parts[0], 10) - 1;
    return `${day} ${months[month]}`;
  };

  useEffect(() => {
    // this useffect is triggered when uniqueArticleId changes. On trigger, call database for unique article data with unique id
    const getUniqueArticleData = async () => {
      const uniqueArticleData = await fetchUniqueArticleData(uniqueArticleId);
      setUniqueArticle(uniqueArticleData);

      if (uniqueArticleData?.article_publishdate) {
        const formattedDate = formatDate(uniqueArticleData.article_publishdate);
        setFormattedDate(formattedDate);
      }
    };
    getUniqueArticleData();
  }, [uniqueArticleId]);

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
            {citationStyle === "Harvard" && (
              <div className="articleCitation">
                Author Surname, Initial. {`(2024).`}{" "}
                {uniqueArticle.article_title}. <i>The Guardian,</i> {"[online]"}{" "}
                {formattedDate}. Available at: {uniqueArticle.article_url}.{" "}
                {`(Accessed: ${dateAccessed})`}.
              </div>
            )}
            {citationStyle === "APA" && <div>Style Pending...</div>}
            {citationStyle === "MLA" && <div>Style Pending...</div>}
          </Card>
        </div>
      </Dialog>
    </>
  );
}
