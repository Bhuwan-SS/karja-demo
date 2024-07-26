import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { useSelector } from "react-redux";
const AccountPdf = ({ showModal }) => {
  const [url, setUrl] = useState("");
  const account = useSelector((state) => state.auth.account);

  useEffect(() => {
    if (account !== null) {
      const {
        contact,
        registrationNo,
        ward,
        photo,
        leftFingerPrintFile,
        rightFingerPrintFile,
        staticSignature1,
        staticSignature2,
      } = account;
      const left = 20;
      let top = 20;
      const unit = "mm";
      const size = "a4"; // Use A1, A2, A3 or A4
      const orientation = "portrait";
      const doc = new jsPDF(orientation, unit, size);
      const pageWidth = doc.internal.pageSize.getWidth();
      const center = pageWidth / 2;
      // Add logo image

      const logoWidth = 30; // Width of the logo image
      const logoHeight = 10; // Height of the logo image
      doc.addImage(logo, "PNG", left, 20, logoWidth, logoHeight);
      const companyNameWidth = doc.getTextWidth("Soori Technology Pvt. Ltd.");
      const companyNameX = center - companyNameWidth / 2;
      doc.text("Soori Technology Pvt. Ltd.", companyNameX, 25);
      top = top + 5;
      doc.setFontSize(10);
      const loacationWidth = doc.getTextWidth("Dillibazar, Kathmandu");
      const locationX = center - loacationWidth / 2;
      doc.text("Dillibazar, Kathmandu", locationX, 25 + 5);
      const dateText = "Date: 2078-03-05";
      doc.setFontSize(10);
      const dateTextWidth = doc.getTextWidth(dateText);
      const dateTextX = pageWidth - left - dateTextWidth; // Calculate the x-coordinate to align to the right
      top = top + 5;
      doc.text(dateText, dateTextX, top);
      doc.setFontSize(14);
      const formName = "Account Opening Form";

      const formNameWidth = doc.getTextWidth(formName);
      const fomrNamex = center - formNameWidth / 2;
      top = top + 15;
      doc.text(formName, fomrNamex, top);
      top = top + 15;

      // Add square box with border
      const boxX = 20; // X-coordinate of the box
      // Y-coordinate of the box
      const boxWidth = 40; // Width of the box
      const boxHeight = 40; // Height of the box
      doc.setDrawColor(0); // Set border color (black)
      doc.setLineWidth(0.5); // Set border width
      doc.rect(pageWidth - boxWidth - left, top, boxWidth, boxHeight); // Draw rectangular border

      // Add image inside the box
      const imageX = boxX + 5; // X-coordinate of the image
      // Y-coordinate of the image
      const imageWidth = boxWidth - 5; // Width of the image (adjust for padding)
      const imageHeight = boxHeight - 5; // Height of the image (adjust for padding)
      doc.addImage(
        `${process.env.REACT_APP_PHOTO_URL}${photo}`,
        "PNG",
        pageWidth - 2 - imageWidth - left,
        top + 2,
        imageWidth,
        imageHeight
      ); // Add image

      top = top + 45;
      doc.setFontSize(12);
      doc.text("GENERAL INFORMATION", left, top);
      doc.setFontSize(10);
      top = top + 5;
      doc.text("NAME:", left, top);

      top += 2; // Move down by 10 units
      // Increase font size for full name
      const table1 = document.getElementById("table1");

      autoTable(doc, {
        theme: "grid",
        html: table1,
        styles: { textColor: [0, 0, 0], lineWidth: 0.5, fontSize: 8 },
        columnStyles: {
          0: { halign: "center" },
        },
        headStyles: {
          fillColor: [255, 255, 255],
        },
        startY: top,
        margin: { left: left, right: left },
      });
      top = top + 12;
      doc.text("Father Name:", left, top);
      const table2 = document.getElementById("table2");
      autoTable(doc, {
        theme: "grid",
        html: table2,
        styles: { textColor: [0, 0, 0], lineWidth: 0.5, fontSize: 8 },
        columnStyles: {
          0: { halign: "center" },
        },
        headStyles: {
          fillColor: [255, 255, 255],
        },
        startY: top + 2,
        margin: { left: left, right: left },
      });
      top = top + 14;
      doc.text("Mother Name:", left, top);
      const table3 = document.getElementById("table3");
      autoTable(doc, {
        theme: "grid",
        html: table3,
        styles: { textColor: [0, 0, 0], lineWidth: 0.5, fontSize: 8 },
        columnStyles: {
          0: { halign: "center" },
        },
        headStyles: {
          fillColor: [255, 255, 255],
        },
        startY: top + 2,
        margin: { left: left, right: left },
      });
      top = top + 14;
      const contactBoxX = 20;

      const contactBoxWidth = 25;
      const provinceBoxWidth = 25;
      const districtBoxWidth = 25;
      const palikaBoxWidth = 25;
      const wardBoxWidth = 45;
      const addressBoxWidth = 10;
      const contactBoxHeight = 7;
      const provinceBoxX = contactBoxX + contactBoxWidth + 5;
      const districtBoxX = provinceBoxX + provinceBoxWidth + 5;
      const palikaBoxX = districtBoxX + districtBoxWidth + 5;
      const wardBoxX = palikaBoxX + palikaBoxWidth + 5;
      const addressBoxX = wardBoxX + wardBoxWidth + 5;

      doc.text("Registration No:", left, top);
      doc.text("Contact:", provinceBoxX, top);
      doc.text("Province:", districtBoxX, top);
      doc.text("District:", palikaBoxX, top);
      doc.text("Palika:", wardBoxX, top);
      doc.text("Ward:", addressBoxX, top);
      top = top + 2;

      doc.setDrawColor(0); // Set border color (black)
      doc.setLineWidth(0.5); // Set border width
      doc.rect(left, top, contactBoxWidth, contactBoxHeight); // Draw rectangular border
      doc.rect(provinceBoxX, top, provinceBoxWidth, contactBoxHeight); // Draw rectangular border
      doc.rect(districtBoxX, top, districtBoxWidth, contactBoxHeight); // Draw rectangular border
      doc.rect(palikaBoxX, top, palikaBoxWidth, contactBoxHeight); // Draw rectangular border
      doc.rect(wardBoxX, top, wardBoxWidth, contactBoxHeight); // Draw rectangular border
      doc.rect(addressBoxX, top, addressBoxWidth, contactBoxHeight); // Draw rectangular border
      top = top + 5;
      doc.text(registrationNo, contactBoxX + 2, top);
      doc.text(contact, provinceBoxX + 2, top);
      doc.text(
        ward?.localLevel?.district?.province?.provinceName?.split(" ")[0],
        districtBoxX + 2,
        top
      );
      doc.text(ward?.localLevel?.district?.districtName, palikaBoxX + 2, top);
      doc.text(ward?.localLevel?.localLevelName, wardBoxX, top);
      doc.text(`${ward?.wardNumber}`, addressBoxX, top);
      doc.addPage();
      doc.setFontSize(14);
      top = 20;
      doc.text("Biometrics:", left, top);
      doc.setFontSize(12);
      top = top + 10;
      doc.text("Fingerprints", left, top);
      top = top + 5;
      const fingerprintWidth = 40; // Width of the fingerprint1
      const fingerprintHeight = 40; // Height of the fingerprint1
      const fingerprint1X = left; // X-coordinate of the fingerprint1
      const fingerprint2X = fingerprint1X + fingerprintWidth + 10; // X-coordinate of the fingerprint1
      doc.setDrawColor(0); // Set border color (black)
      doc.setLineWidth(0.5); // Set border width
      doc.rect(fingerprint1X, top, fingerprintWidth, fingerprintHeight); // Draw rectangular border
      doc.rect(fingerprint2X, top, fingerprintWidth, fingerprintHeight); // Draw rectangular border
      const fingerprintImage1X = fingerprint1X + 5; // X-coordinate of the fingerprintImage1
      const fingerprintImageWidth = fingerprintWidth - 5; // Width of the fingerprintImage1 (adjust for padding)
      const fingerprintImage2X = left + fingerprintImageWidth + 20; // X-coordinate of the fingerprintImage1
      const fingerprintImageHeight = fingerprintHeight - 5; // Height of the fingerprintImage1 (adjust for padding)

      doc.addImage(
        `${process.env.REACT_APP_PHOTO_URL}${leftFingerPrintFile}`,
        "PNG",
        fingerprintImage1X,
        top + 2,
        fingerprintImageWidth,
        fingerprintImageHeight
      );
      // Add image
      doc.addImage(
        `${process.env.REACT_APP_PHOTO_URL}${rightFingerPrintFile}`,
        "PNG",
        fingerprintImage2X,
        top + 2,
        fingerprintImageWidth,
        fingerprintImageHeight
      ); // Add image
      top = top + fingerprintHeight + 10;
      doc.text("Signatures:", left, top);
      top = top + 5;
      const signatureWidth = 40; // Width of the signature1
      const signatureHeight = 40; // Height of the signature1
      const signature1X = left; // X-coordinate of the signature1
      const signature2X = signature1X + signatureWidth + 10; // X-coordinate of the signature1
      doc.setDrawColor(0); // Set border color (black)
      doc.setLineWidth(0.5); // Set border width
      doc.rect(signature1X, top, signatureWidth, signatureHeight); // Draw rectangular border
      doc.rect(signature2X, top, signatureWidth, signatureHeight); // Draw rectangular border
      const signatureImage1X = signature1X + 5; // X-coordinate of the signatureImage1
      const signatureImageWidth = signatureWidth - 5; // Width of the signatureImage1 (adjust for padding)
      const signatureImage2X = left + signatureImageWidth + 20; // X-coordinate of the signatureImage1
      const signatureImageHeight = signatureHeight - 5; // Height of the signatureImage1 (adjust for padding)

      doc.addImage(
        `${process.env.REACT_APP_PHOTO_URL}${staticSignature1}`,
        "PNG",
        signatureImage1X,
        top + 2,
        signatureImageWidth,
        signatureImageHeight
      ); // Add image
      doc.addImage(
        `${process.env.REACT_APP_PHOTO_URL}${staticSignature2}`,
        "PNG",
        signatureImage2X,
        top + 2,
        signatureImageWidth,
        signatureImageHeight
      ); // Add image

      top = top + 10 + signatureHeight;

      const noteText =
        "I have read the terms and conditions and I hereby accept and agree to the terms and conditions as stated.";
      const titleWidth = doc.getTextWidth(noteText);
      const textTitle = (pageWidth - titleWidth) / 2;
      const lines = doc.splitTextToSize(noteText, pageWidth - left * 2); // 190 is the width of the text area

      // Add the title text
      doc.text(lines[0], left + 5, top);
      top = top + 5;

      doc.text(lines[1], left + 5, top);
      // doc.text(lines[1], left + 5, 110);
      // doc.text(lines[2], left + 5, 120);
      top = top + 50; // Adjust the Y position of the line
      const lineWidth = pageWidth - 2 * left; // Adjust the width of the line
      doc.setDrawColor(0); // Set line color (black)
      doc.setLineWidth(0.5); // Set line width
      doc.line(left, top, left + lineWidth, top);
      top = top + 5; // Adjust the Y position of the line
      doc.text("For Bank Purpose only.", left, top);
      top = top + 30; // Adjust the Y position of the line

      doc.text("Signature", left, top);
      top = top + 10; // Adjust the Y position of the line
      doc.text("Date:", left, top);
      doc.setProperties({
        title: "Account ",
      });
      setUrl(doc.output("datauristring"));
    }
  }, [account]);

  return (
    <>
      <div style={{ display: "none" }}>
        <table id="table1">
          <tbody>
            <tr>
              {account &&
                account?.fullName
                  .toUpperCase()
                  .split("")
                  .map((fullName, i) => {
                    return <td key={i}>{fullName}</td>;
                  })}
            </tr>
          </tbody>
        </table>
        <table id="table2">
          <tbody>
            <tr>
              {account &&
                account?.fatherName
                  .toUpperCase()
                  .split("")
                  .map((name, i) => {
                    return <td key={i}>{name}</td>;
                  })}
            </tr>
          </tbody>
        </table>
        <table id="table3">
          <tbody>
            <tr>
              {account &&
                account?.motherName
                  .toUpperCase()
                  .split("")
                  .map((name, i) => {
                    return <td key={i}>{name}</td>;
                  })}
            </tr>
          </tbody>
        </table>
      </div>
      <iframe
        title="thi"
        type="application/pdf"
        width="100%"
        src={url}
        height="560px"
      ></iframe>
    </>
  );
};

export default AccountPdf;
