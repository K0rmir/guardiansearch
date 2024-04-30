"use client";

import "@/styles/Header.css";
import "primeicons/primeicons.css";
import {useRouter} from "next/navigation";
import {InputText} from "primereact/inputtext";
import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {Button} from "primereact/button";

export default function Header() {
  const router = useRouter();
  const {setHeaderSearch} = useApiContext();
  const [advSearchBool, setAdvSearchBool] = useState();
  const {isSignedIn} = useUser();

  let params;
  // This useeffect exists to check whether or not user is on advanced search page in order to render(or not) the search bar //
  useEffect(() => {
    params = document.location.href;
    setAdvSearchBool(params.includes("/advancedsearch"));
  }, []);

  // function to handle a generic search when the search bar is rendered on generic articles page //
  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
    setHeaderSearch(true);
  }

  return (
    <>
      {/* Main logo */}
      <div className="header">
        <div className="headerLogo">
          <a href="/">
            <img
              src="./guardiansearchrectangle.jpg"
              alt="temp"
              className="headerLogo"
            />
          </a>
        </div>
        {/* Only show generic search bar in header if not on advanced search page */}
        {!advSearchBool && (
          <div className="formContainerHeader">
            <div className="searchFormHeader">
              <form action={handleFormSearch}>
                <InputText
                  className="searchInputHeader"
                  type="text"
                  name="searchQuery"
                  id="searchQuery"
                  placeholder="Search articles..."
                />
                <button type="submit" className="searchBtnHeader">
                  <i
                    className="pi pi-search"
                    style={{fontSize: "1.5rem", color: "#052962"}}></i>
                </button>
                <p>
                  Want to be more specific? Try &nbsp;
                  <a href={"/advancedsearch"}>Advanced Search</a>
                </p>
              </form>
            </div>
          </div>
        )}

        <div className="userControls">
          {/* User account controls */}
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton className="signInButton" />
          </SignedOut>
        </div>

        {/* Only display bookmarks link if user is signed in */}
        {isSignedIn && (
          <Button
            className="savedArticlesBtn"
            icon="pi pi-bookmark"
            severity="secondary"
            aria-label="Bookmark"
            tooltip="Go to your Bookmarked Articles"
            tooltipOptions={{position: "left"}}
            onClick={() => {
              router.push("/savedarticles");
            }}></Button>
        )}
      </div>
    </>
  );
}
