import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-2 container-fluid" id="#footer">
      <div className="container text-center">
       support@GroceryBag.co
        <br />
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
