"use client";

import {InputText} from "primereact/inputtext";
import "primeicons/primeicons.css";
import {useRouter} from "next/navigation";
import "../styles/Home.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {Button} from "primereact/button";

export default function Home() {
  const router = useRouter();
  const {isSignedIn} = useUser();

  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
  }

  return (
    <>
      <div className="userControls">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton className="signInButton" />
        </SignedOut>
      </div>
      {isSignedIn && (
        <Button
          className="savedArticlesBtn"
          icon="pi pi-bookmark"
          severity="secondary"
          aria-label="Bookmark"
          tooltip="Go to your Bookmarked Articles"
          tooltipOptions={{position: "left"}}
          badgeClassName="articleBookmark"
          onClick={() => {
            router.push("/savedarticles");
          }}></Button>
      )}
      <div>
        <div className="logoContainer">
          <img
            src="./searchguardianlogomain.png"
            className="logo"
            alt="The Guardian Search Logo"
          />
        </div>

        <div className="formContainer">
          <div className="searchForm">
            <form action={handleFormSearch}>
              <InputText
                className="searchInput"
                type="text"
                name="searchQuery"
                id="searchQuery"
                placeholder="Search articles..."
              />
              <button type="submit" className="searchBtn">
                <i
                  className="pi pi-search"
                  style={{fontSize: "1.5rem", color: "#052962"}}></i>
              </button>
              <p className="advSearchText">
                <strong>
                  Want to be more specific? Try &nbsp;
                  <a href={"/advancedsearch"}> Advanced Search</a>
                </strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
