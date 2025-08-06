import React from "react";
import hospitalseal from "@/assets/form_templates/common/hospitalseal.jpg";
import docsign from "@/assets/form_templates/common/doctorsignature.jpg";
import {
  getMonthYearArray,
  getTimeFromDate,
  getValidFormattedDateArray,
  mainFilledData,
  normalizeString,
  parseAgeToLabel,
  parseAgeToYYMM,
} from "./functions";

const BajajForm = ({ data }) => {
  const timeDigits = getTimeFromDate(data?.dateAndTimeOfSignature);
  const admissionTimeDigits = getTimeFromDate(data?.dateAndTimeOfAdmission);
  const dateDigits = getValidFormattedDateArray(data?.dateAndTimeOfSignature);
  const admissionDateDigits = getValidFormattedDateArray(
    data?.dateAndTimeOfAdmission
  );

  const dateOfBirthDigits = getValidFormattedDateArray(data?.dateOfBirth);
  const dateOfInjuryDigits = getValidFormattedDateArray(data?.dateOfInjury);
  const dateOfDeliveryDigits = getValidFormattedDateArray(
    data?.expectedDateOfDelivery
  );

  const contactDigits = data?.contactNo?.split("") || [];
  const relativeContactDigits =
    data?.contactNoOfAttendingRelative?.split("") || [];

  const consulationDateDigits = getValidFormattedDateArray(
    data?.doctorDateOfFirstConsultation
  );
  const proposedLineOfTreatmentFn = (keyword) => {
    const value = normalizeString(data?.proposedLineOfTreatment);
    return value.includes(normalizeString(keyword));
  };
  const isEmergencyType = (type = "") => {
    const event = normalizeString(data?.isThisAEmergencyOrPlannedEvent);
    return event.includes(normalizeString(type));
  };

  //Diabetes
  const diabetesDateDigits = data?.diabetesSinceTf
    ? getMonthYearArray(data?.diabetesSince)
    : ["-", "-", "-", "-"];

  const heartDiseaseDateDigits = data?.heartDiseaseSinceTf
    ? getMonthYearArray(data?.heartDiseaseSince)
    : ["-", "-", "-", "-"];

  const hyperTensionDateDigits = data?.hypertensionSinceTf
    ? getMonthYearArray(data?.hypertensionSince)
    : ["-", "-", "-", "-"];
  const hyperLipidemiasDateDigits = data?.hyperlipidemiasSinceTf
    ? getMonthYearArray(data?.hyperlipidemiasSince)
    : ["-", "-", "-", "-"];
  const osteoDateDigits = data?.osteoarthritisSinceTf
    ? getMonthYearArray(data?.osteoarthritisSince)
    : ["-", "-", "-", "-"];
  const asthmaDateDigits = data?.asthmaCopdBronchitisSinceTf
    ? getMonthYearArray(data?.asthmaCopdBronchitisSince)
    : ["-", "-", "-", "-"];
  const cancerDateDigits = data?.cancerSinceTf
    ? getMonthYearArray(data?.cancerSinceTf)
    : ["-", "-", "-", "-"];
  const alocholDrugAbuseDateDigits = data?.alcoholDrugabuseSinceTf
    ? getMonthYearArray(data?.alcoholDrugabuseSince)
    : ["-", "-", "-", "-"];
  const hivDateDigits = data?.hivstdSinceTf
    ? getMonthYearArray(data?.hivstdSince)
    : ["-", "-", "-", "-"];
  const anyOtherAilmentDateDigits = data?.anyOtherailmentSinceTf
    ? getMonthYearArray(data?.anyOtherailmentSince)
    : ["-", "-", "-", "-"];

  return (
    <>
  <meta charSet="UTF-8" />
  <title />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            background-color: #444;\n            padding: 0 10px;\n            margin: 0;\n            min-width: fit-content;\n        }\n        .page-container {\n            margin: 10px auto;\n            width: fit-content;\n        }\n        .page {\n            overflow: hidden;\n            position: relative;\n            background-color: white;\n        }\n        .annotations-container {\n            position: absolute;\n            pointer-events: none;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 3;\n        }\n        .annotations-container > div {\n            position: absolute; pointer-events: auto; -webkit-user-select: none;\n        }\n        .annotations-container > div:hover {\n            background-color: rgba(255, 255, 0, 0.25);\n            cursor: pointer;\n        }\n    "
    }}
  />
  <style
    className="shared-css"
    type="text/css"
    dangerouslySetInnerHTML={{
      __html:
        "\n.t {\n\ttransform-origin: bottom left;\n\tz-index: 2;\n\tposition: absolute;\n\twhite-space: pre;\n\toverflow: visible;\n\tline-height: 1.5;\n}\n.text-container {\n\twhite-space: pre;\n}\n@supports (-webkit-touch-callout: none) {\n\t.text-container {\n\t\twhite-space: normal;\n\t}\n}\n"
    }}
  />
  <style
    id="fonts4"
    type="text/css"
    dangerouslySetInnerHTML={{
      __html:
        '\n\n@font-face {\n\tfont-family: AllianzSans-Bold_u;\nsrc: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");\n}\n\n@font-face {\n\tfont-family: AllianzSans-Light_n;\nsrc: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");\n}\n\n@font-face {\n\tfont-family: AllianzSans_10;\nsrc: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");\n}\n\n@font-face {\n\tfont-family: ArialMT_g;\nsrc: url(data:application/font-woff;charset=utf-8;base64,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) format("woff");\n}\n\n'
    }}
  />
  <style
    type="text/css"
    dangerouslySetInnerHTML={{
      __html:
        "\n\n.s0{font-size:11px;font-family:ArialMT_g;color:#231F20;}\n.s1{font-size:14px;font-family:AllianzSans-Light_n;color:#231F20;}\n.s2{font-size:15px;font-family:AllianzSans-Bold_u;color:#231F20;}\n.s3{font-size:11px;font-family:AllianzSans-Bold_u;color:#231F20;}\n.s4{font-size:11px;font-family:AllianzSans-Light_n;color:#231F20;}\n.s5{font-size:15px;font-family:AllianzSans-Bold_u;color:#0072BC;}\n.s6{font-size:14px;font-family:AllianzSans_10;color:#231F20;}\n.s7{font-size:14px;font-family:AllianzSans-Bold_u;color:#231F20;}\n.s8{font-size:14px;font-family:AllianzSans_10;color:#939598;}\n.s9{font-size:18px;font-family:AllianzSans-Bold_u;color:#FFF;}\n.sa{font-size:11px;font-family:AllianzSans-Light_n;color:#D1D3D4;}\n.sb{font-size:14px;font-family:AllianzSans-Light_n;color:#939598;}\n.sc{font-size:11px;font-family:AllianzSans_10;color:#231F20;}\n.sd{font-size:9px;font-family:AllianzSans_10;color:#231F20;}\n.t.m0{transform:matrix(0,1,-1,0,0,0);}\n"
    }}
  />
  <div className="page-container">
    <div className="page" style={{ width: 909, height: 1286 }}>
      <div
        id="pg1Overlay"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0)",
          WebkitUserSelect: "none"
        }}
      />
      <div id="pg1" style={{ WebkitUserSelect: "none" }}>
        <img
          id="pdf1"
          style={{ width: 909, height: 1286 }}
          src="data:image/svg+xml,%3Csvg viewBox='0 0 909 1286' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%0A%3Cdefs%3E%0A%3CclipPath id='c0'%3E%3Cpath d='M666.3 85.9c-4.5 0-8.1-3.7-8.1-8.2c0-4.5 3.6-8.1 8.1-8.1c4.5 0 8.1 3.6 8.1 8.1c0 4.5-3.6 8.2-8.1 8.2Z'/%3E%3C/clipPath%3E%0A%3Cstyle%3E%0A.g0%7Bfill:%23231F20%3B%7D%0A.g1%7Bfill:%23FFF%3B%7D%0A.g2%7Bfill:none%3Bstroke:%23231F20%3Bstroke-width:0.763%3Bstroke-miterlimit:22%3B%7D%0A.g3%7Bfill:%230072BC%3B%7D%0A.g4%7Bfill:none%3Bstroke:%23231F20%3Bstroke-width:0.33%3Bstroke-miterlimit:22%3B%7D%0A.g5%7Bfill:%230B72BA%3B%7D%0A.g6%7Bfill:%2316609D%3B%7D%0A%3C/style%3E%0A%3C/defs%3E%0A%3Cpath fill-rule='evenodd' d='M858.8 195.6h12.3V1235.4H858.8Z' class='g0'/%3E%0A%3Cpath fill-rule='evenodd' d='M858.8 282h12.3V388.5H858.8Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M858.8 456.2h12.3V562.7H858.8Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M858.8 920.4h12.3v106.5H858.8Z' class='g1'/%3E%0A%3Cpath d='M231.7 540.3v19h19v-19m-19 0v19H212.6v-19m-19 0v19H174.5v-19m19.1 0v19h19v-19m57.2 0v19H250.7v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H288.8v-19m57.2 0v19H326.9v-19m19.1 0v19h19v-19' class='g2'/%3E%0A%3Cpath fill-rule='evenodd' d='M-.7 145.8H909v23.1H-.7Z' class='g3'/%3E%0A%3Cpath d='M172.3 491.1v19h-19v-19m90.7 0v19H225v-19m129 0v19H334.9v-19m19.1 0v19h19v-19m72.2 0v19h-19v-19m19 0v19h19.1v-19m129.8 0v19h-19v-19m19 0v19h19.1v-19m25.1 0v19h-19v-19m19 0v19h19.1v-19m25.1 0v19H663.4v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H701.5v-19M806 540.3v19h19v-19m-19 0v19H786.9v-19m-19 0v19H748.8v-19m19.1 0v19h19v-19m57.2 0v19H825v-19m-133.3 0v19H672.6v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H710.7v-19m-57.1 0v19h19v-19m-19 0v19H634.5v-19m-19 0v19H596.4v-19m19.1 0v19h19v-19m-57.1 0v19h19v-19m-19 0v19h-19v-19m-19.1 0v19h19.1v-19M419.8 588.8v19.1h19V588.8m-19 0v19.1H400.7V588.8m-19 0v19.1H362.6V588.8m19.1 0v19.1h19V588.8m57.2 0v19.1H438.8V588.8m-133.3 0v19.1H286.4V588.8m19.1 0v19.1h19V588.8m19.1 0v19.1h19V588.8m-19 0v19.1H324.5V588.8m-57.1 0v19.1h19V588.8m-19 0v19.1h-19V588.8m-19.1 0v19.1h-19V588.8m19 0v19.1h19.1V588.8m-57.2 0v19.1h19.1V588.8m-19.1 0v19.1h-19V588.8m-19.1 0v19.1h19.1V588.8m262.6 23.9v19h-19v-19m66.1 0v19H462.8v-19M267.7 688.4v19.1H248.6V688.4m66.2 0v19.1H295.7V688.4m-28.5 25.4v19.1h19V713.8m-19 0v19.1H248.1V713.8m-19 0v19.1H210V713.8m19.1 0v19.1h19V713.8m57.2 0v19.1H286.2V713.8m19.1 0v19.1h19V713.8m19.1 0v19.1h19V713.8m-19 0v19.1H324.3V713.8m57.2 0v19.1H362.4V713.8m19.1 0v19.1h19V713.8m309.4 74.6v19.1H729V788.4m-19.1 0v19.1h-19V788.4m-19.1 0v19.1h-19V788.4m19 0v19.1h19.1V788.4m57.1 0v19.1H729V788.4m19 0v19.1h19.1V788.4m19 0v19.1h19.1V788.4m-19.1 0v19.1h-19V788.4m57.1 0v19.1h-19V788.4m19 0v19.1h19.1V788.4M251.4 860.2v19h19.1v-19m19 0v19h-19v-19m19 0v19h19.1v-19m401.3 47v19.1H729V907.2m-19.1 0v19.1h-19V907.2m-19.1 0v19.1h-19V907.2m19 0v19.1h19.1V907.2m57.1 0v19.1H729V907.2m19 0v19.1h19.1V907.2m19 0v19.1h19.1V907.2m-19.1 0v19.1h-19V907.2m57.1 0v19.1h-19V907.2m19 0v19.1h19.1V907.2M245.7 935v19H226.6V935m205.9 0v19h-19V935m252.9 0v19H647.3V935M245.7 958.5v19.1H226.6V958.5m205.9 0v19.1h-19V958.5m296.4 102.6v19.1H729v-19.1m-19.1 0v19.1h-19v-19.1m-19.1 0v19.1h-19v-19.1m19 0v19.1h19.1v-19.1m57.1 0v19.1H729v-19.1m19 0v19.1h19.1v-19.1m19 0v19.1h19.1v-19.1m-19.1 0v19.1h-19v-19.1m57.1 0v19.1h-19v-19.1m19 0v19.1h19.1v-19.1m-584.8 75v19.1h-19v-19.1m62.3 0v19.1h-19v-19.1m-73 24.1v19h-19v-19m62.3 0v19h-19v-19m265.7 0v19h-19v-19m19 0v19h19.1v-19m19 0v19h-19v-19m19 0v19H557v-19m19 0v19H557v-19m19 0v19h19.1v-19m19 0v19h-19v-19m-114.2 25.7V1205h-19v-19.1m70.6 0V1205h-19v-19.1m-226 23V1228H268.4v-19.1m67.1 0V1228h-19v-19.1m24.8 25V1253h-19v-19.1m-92.7 0V1253H210.5v-19.1m57.8 0V1253H249.2v-19.1m55.1 0V1253h-19v-19.1M491.5 860.2v19h19v-19m19.1 0v19H510.5v-19m25.1 0v19h19.1v-19m19 0v19h-19v-19m25.1 0v19h19.1v-19m19 0v19h-19v-19m57.1 0v19H637v-19m-19.1 0v19H637v-19M480.4 1136.1v19.1h19.1v-19.1m19 0v19.1h-19v-19.1m25.1 0v19.1h19v-19.1m19.1 0v19.1H543.6v-19.1m25.1 0v19.1h19.1v-19.1m19 0v19.1h-19v-19.1m57.1 0v19.1h-19v-19.1m-19.1 0v19.1h19.1v-19.1m-139.1 97.8V1253h19.1v-19.1m19 0V1253h-19v-19.1m25.1 0V1253h19.1v-19.1m19 0V1253h-19v-19.1m25.1 0V1253h19v-19.1m19.1 0V1253H594.2v-19.1m57.2 0V1253H632.3v-19.1m-19 0V1253h19v-19.1' class='g2'/%3E%0A%3Cpath d='M64 228.1H842.7M64 420.1H842.7M63.6 782.3H842.3' class='g4'/%3E%0A%3Cpath d='M633.5 514.9v19h19v-19m-19 0v19H614.4v-19m-19 0v19H576.3v-19m19.1 0v19h19v-19m57.1 0v19h-19v-19m19 0v19h19.1v-19m19 0v19h19.1v-19m-19.1 0v19h-19v-19m57.1 0v19h-19v-19m19 0v19h19.1v-19m-81.3 719V1253h19v-19.1m19.1 0V1253H704.5v-19.1m25.2 0V1253h19v-19.1m19.1 0V1253H748.7v-19.1m25.1 0V1253h19.1v-19.1m19 0V1253h-19v-19.1m57.1 0V1253H831v-19.1m-19.1 0V1253H831v-19.1M730.2 283.8v19.1H711.1V283.8m19.1 0v19.1h19V283.8m19.1 0v19.1h19V283.8m-19 0v19.1H749.2V283.8m57.2 0v19.1H787.3V283.8m19.1 0v19.1h19V283.8m19.1 0v19.1H825.4V283.8m-228.6 0v19.1h-19V283.8m19 0v19.1h19.1V283.8m19 0v19.1H654V283.8m-19.1 0v19.1h-19V283.8m57.1 0v19.1H654V283.8m19 0v19.1h19.1V283.8m19 0v19.1h-19V283.8M730.2 309v19.1H711.1V309m19.1 0v19.1h19V309m19.1 0v19.1h19V309m-19 0v19.1H749.2V309m57.2 0v19.1H787.3V309m19.1 0v19.1h19V309m19.1 0v19.1H825.4V309m-228.6 0v19.1h-19V309m19 0v19.1h19.1V309m19 0v19.1H654V309m-19.1 0v19.1h-19V309m57.1 0v19.1H654V309m19 0v19.1h19.1V309m19 0v19.1h-19V309' class='g2'/%3E%0A%3Cpath fill-rule='evenodd' d='M641.1 59.3H869.9V96.5H641.1Z' class='g3'/%3E%0A%3Cimage preserveAspectRatio='none' x='653' y='64' width='28' height='29' href='data:image/jpeg%3Bbase64%2C/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAB0AHAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5%2BgEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4%2BTl5ufo6ery8/T19vf4%2Bfr/2gAMAwEAAhEDEQA/AOHsbWW6mWKJSSa/V5zUVdn47TpyqS5Y7nZ6f4Cup7cSMjkkeledPMYp2R7dLJJSjeTMLxD4dutLYl0bb9K6qGKjVPPxeAqYbXdGEFOa6Thud58K7GG4vkaQAktXl5lUcY2R7%2BSUYylzM9/toI4YVRFAAFfKSk27n2iikjjfifp1vJphkKLk5r0MvqyU7Hn5jSjKm7nhdpaRvc3CHojAD9a%2BplUaSZ8LSoKUpJ9DQ8Da1/Zl%2BhY4XIrHGUPaxOrLMX7CpZ7M9003xfp0tqrO/OK%2BXngpp6H21PGU5RucT8SvF0E9uYYWz6V6WAwUk7s8jNMxhGFkeSxXTpJIwPLnJr6BwTPj1UlHVdSsCQcirJLkOpXkSbUmYCs3Sg90axr1YKykV555ZmLSOWPvVKKWxnJuTvJ3IqoQ/9k='/%3E%0A%3Cpath fill-rule='evenodd' d='M660 71.6c3.8-4 10.1-4.1 14.1-.3c4 3.8 4.1 10.1 .3 14.1c-3.8 4-10.1 4.1-14.1 .3c-4-3.8-4.1-10.1-.3-14.1Z' class='g5'/%3E%0A%3Cpath fill-rule='evenodd' d='M657.4 78.5c0 2.6 1 5.1 3 7c1.9 1.9 4.4 2.8 6.8 2.8c2.6 0 5.1-1 7.1-3c1.8-1.9 2.7-4.4 2.7-6.8c0-2.6-1-5.1-3-7.1c-1.9-1.8-4.4-2.7-6.8-2.7c-2.6 0-5.1 1-7.1 3c-1.8 1.9-2.7 4.4-2.7 6.8Zm9.8 10.1c-2.5 0-5.1-.9-7-2.8c-2.1-2-3.1-4.6-3.1-7.3c0-2.5 .9-5.1 2.8-7c2-2.1 4.6-3.2 7.3-3.2c2.5 0 5.1 1 7 2.9c2.1 2 3.2 4.6 3.2 7.3c0 2.5-1 5.1-2.9 7c-2 2.1-4.6 3.1-7.3 3.1Z' class='g6'/%3E%0A%3Cimage clip-path='url(%23c0)' preserveAspectRatio='none' x='658' y='70' width='16' height='16' href='data:image/jpeg%3Bbase64%2C/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABAAEAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5%2BgEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4%2BTl5ufo6ery8/T19vf4%2Bfr/2gAMAwEAAhEDEQA/APTPhZ4Z8PR%2BHmuL3y/trplnPJzj7o9APT8etfTY/E1nVstjwsvwdGlSWmp5p8TLOzjv5WtwAVOVZeor2MBKUopM8nNqcEnJboz9O8V3VrbiAyOjLwy%2B9azwam7owp5pyRtLcxta1WS%2BclmOM5JNdVGiqaPOxeMdd2QA/9k='/%3E%0A%3Cpath fill-rule='evenodd' d='M671.3 78.5h-.1h.1Zm-.1 0c1.3-.3 2.5-1.2 2.5-2.5c0-2.7-3.2-2.9-5.2-2.9h-6.7V84.2h2.5V75.4h6.2v1.8h-4v2.6h3.7v1.8h-3.7v2.6h2c2.1 0 5.2-.3 5.2-3c0-1.3-.9-2.2-2.5-2.7Z' class='g6'/%3E%0A%3Cpath fill-rule='evenodd' d='M671.1 78.3H671h.1Zm-.1 0c1.3-.3 2.4-1.2 2.4-2.5c0-2.7-3.2-3-5.2-3h-6.6V83.9h2.5V75.2c0 0-.1-.1 0-.1h6.1v1.8c0 0 0 .1 0 .1h-3.9v2.6H670v1.8h-3.7v2.5h1.9c2.2 0 5.2-.2 5.2-3c0-1.2-.8-2.1-2.4-2.6Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M852.9 74.6c-.2-.2-.6-.3-1-.3h-1.7V84h3v-.1h.1V75.8c0-.2-.1-.4-.1-.6c-.1-.2-.2-.4-.3-.6Zm-4-2.5c-.2-.3-.6-.3-1-.3h-2.6v1.7h.5c.2 0 .3 .1 .4 .1q0 .1 0 .2V84H849v-.1h.1v-.1h.1v-.1h.1V73.3c0-.2-.1-.4-.1-.6c-.1-.3-.1-.5-.3-.6Zm-3.7 2.2h-1.7c-.4 0-.7 .1-1 .3c-.2 .3-.3 .6-.3 1V84h3v-.1h.1V74.5h-.1Zm8.3 10.1c-1.4 1.5-3.4 2.3-5.8 2.3c-4.6 0-8-3.4-8-8.2c0-2.4 .9-4.4 2.3-5.9c1.4-1.4 3.4-2.2 5.7-2.2c4.7 0 8.1 3.4 8.1 8.2c0 2.3-.8 4.4-2.3 5.8ZM855 71.2c-1.8-1.8-4.4-2.9-7.3-2.9c-2.9 0-5.4 1.1-7.2 2.9v.1h-.1c-1.8 1.8-2.8 4.3-2.8 7.3c0 2.9 1 5.4 2.8 7.2c1.9 1.9 4.4 2.9 7.3 2.9c2.9 0 5.5-1 7.3-2.9h.1c1.8-1.8 2.9-4.4 2.9-7.3c0-2.9-1.1-5.5-3-7.3ZM833 81.9h-4.1l4.1-5.7V73.8h-6.6c-.4 0-.7 .1-.9 .3c-.3 .3-.3 .6-.3 1v2.1h1.5v-.5c0-.2 0-.3 .1-.4c0-.1 .2-.1 .5-.1h1.9l-4.1 5.7v2.4h8.1V82.1H833Zm-23.4-.8c-.6 .6-1.1 .8-1.6 .8c-.3 0-.5 0-.6-.1c-.1-.1-.1-.4-.1-.7c0-.8 .1-1 .7-1.2c.4-.2 .8-.3 1.6-.4Zm3.4 1.6c-.1-.1-.2-.2-.2-.4v-5c0-1.3-.2-2.2-.8-2.8c-.6-.6-1.5-.8-2.7-.8c-.9 0-1.7 .1-2.4 .3c-.6 .1-1.2 .3-2.1 .8h-.2l.9 2.3l.2-.1l.2-.1c.8-.3 1.2-.4 1.7-.5c.5-.1 .7-.1 .9-.1c.4 0 .7 .1 .9 .2c.1 .2 .2 .4 .2 .8v.1c-1.3 .2-1.7 .3-2.4 .4c-.4 .1-.8 .2-1.2 .4c-1.3 .6-1.9 1.6-1.9 3.2c0 1 .2 1.7 .7 2.2c.4 .6 1.1 .8 1.9 .8h.1c.7 0 1.4-.1 2-.5c.3-.2 .5-.3 .9-.6c0 .3 .1 .5 .2 .7c.2 .2 .5 .3 .8 .3h3V82.8h-.3c-.2 0-.3 0-.4-.1Zm8.3-9c-1.1 0-2 .4-3.2 1.3c0-.4 0-.7-.2-.9c-.2-.2-.5-.3-.8-.3h-3.2v1.5h.4c.3 0 .4 .1 .5 .2c.1 .1 .1 .2 .1 .4v8.4h3.2v-.2h.2V77.3c.6-.5 1-.7 1.6-.7c.3 0 .5 .1 .5 .2c.1 .1 .2 .4 .2 .9v6.6h3.3V77.2c0-1.4-.1-2-.6-2.6c-.5-.6-1.2-.9-2-.9Zm-30.4-3.2h-3.2V72h.4c.2 0 .4 .1 .5 .2c0 0 .1 .1 .1 .4V84.3h3.2v-.2h.2V71.7c0-.4-.1-.7-.3-.9c-.2-.2-.5-.3-.9-.3Zm-10.5 8l1.3-4.4l1.2 4.4Zm2.5-8h-5.1V72h.6c.3 0 .5 .1 .6 .1q.1 .1 .1 .3c0 .3 0 .4-.2 1.1l-3.6 10.8h3.5l.1-.1l.9-3.1h3.6l.9 3.2h3.8l-3.5-12.6c-.3-.9-.8-1.3-1.7-1.2Zm13.4 0h-3.2V72h.4c.4 .1 .6 .1 .6 .6V84.3h3.2v-.2h.2V71.7c0-.4-.1-.7-.4-.9c-.2-.2-.5-.3-.8-.3Zm4.7-.3c-.6 0-1.1 .2-1.4 .5c-.4 .2-.6 .7-.6 1.2c0 .5 .2 .9 .6 1.2c.3 .3 .8 .4 1.4 .4c.6 0 1.1-.1 1.4-.4c.4-.3 .5-.7 .5-1.2c0-.5-.1-.9-.5-1.2c-.3-.3-.8-.5-1.4-.5Zm.7 3.6h-3.2v1.5h.4c.2 0 .4 .1 .4 .2c.1 .1 .2 .2 .2 .4v8.4h3.4V75c0-.3-.1-.6-.3-.8c-.2-.3-.5-.4-.9-.4Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M681.9 84.1V71.7h11c2.3 0 6 .3 6 3.3c0 1.4-1.3 2.5-2.8 2.8c1.9 .6 2.8 1.6 2.8 3c0 3-3.5 3.3-6 3.3Zm4-5.2l1.2-1.9c.3-.4 .8-.7 1.3-.7h4.5c.9 0 1.5-.4 1.5-1c0-.6-.6-1-1.5-1h-7Zm0 0v5.2l1.2-1.9c.3-.4 .8-.7 1.3-.7h4.5c.8 0 1.5-.6 1.5-1.3c0-.7-.6-1.3-1.5-1.3Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M708.7 74.7l-5.5 9.4h-4.7l7.6-12.4h5.2L719 84.1h-4.8l-1.3-2.2h-7L707 80c.3-.4 .8-.7 1.3-.7h3.1Zm33.3 0l-5.5 9.4h-4.8l7.7-12.4h5.2l7.6 12.4h-4.7l-1.3-2.2h-7.1l1.2-1.9c.2-.4 .8-.7 1.3-.7h3.1Zm-15.6 6.8c.9 0 1.7-.4 1.7-1.3V71.7h4v8.9c0 2.6-1.8 3.5-4.1 3.5h-6.8c-.5 0-1-.3-1.3-.7l-1.2-1.9Zm33.2 0c1 0 1.7-.4 1.7-1.3V71.7h4.1v8.9c0 2.6-1.8 3.5-4.2 3.5h-6.7c-.5 0-1.1-.3-1.3-.7L752 81.5Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M770.5 68.4V88.6h1.1V68.4Z' class='g1'/%3E%0A%3Cpath d='M668.5 47.8c0 0-.1 0-.1 0c0 .1 0 .2-.1 .2c-.1 0-.2 0-.2 0c.1 0 .2 0 .2 0c0 0 .1 0 .1 0v.1c0-.1-.1-.1-.1 0c-.1 0-.2 .1-.2 .1q0-.1 0-.1q.1 0 0-.1q-.1 0-.1 0c0 0 .1 0 .1 0c.1 0 .1-.1 .1-.1c-.2 0-.4 .1-.5 .1c-.2 .1-.4 .2-.5 .3c.1 .1 .2 0 .4 0c.1-.1 .2-.2 .3-.3c0 .2-.1 .3-.3 .3c-.1 0-.2 .1-.4 .2q.1 0 .1-.1c0 0 .1 0 .1 0q0 .1 0 .1c0-.1 0 0 0 0q.1 0 .2 0c.1-.1 .2-.1 .2-.1q0-.1 0-.2c.1 0 .2-.1 .2-.2c0 .2 0 .3-.1 .3q.1 0 .2-.1c0 0 .1 0 .1 0h-.1c0 0 0 .1 0 .1c.2 0 .4-.1 .5-.3c0 0 0 .1 0 .1q.1 0 .1 0q0-.1 0-.1q.1 .1 0 .1c0 0-.1 .1-.1 .1l-.5 .2c0 0 0 .1 .1 0h.1q-.1 .1-.2 .1q-.1 0-.2 .1h.1v.1l-1.2 .4c0 0-.1 0-.2 0c-.1 0-.2 0-.2 .1c-.1 0-.2 0-.2 0c-.1 .1-.2 .1-.3 .1c-.1 0-.3 0-.4 0c-.2 .1-.3 .1-.5 0c-.1 0-.1 .1-.1 .1c0 0-.1 0-.1-.1c0 0 0 .1 0 .1q-.1 0-.2 0c-.1 0-.2 0-.3 0c0 0-.1 0-.1 0c-.1 0-.2 0-.2 0c-.1 0-.2 0-.3 0c0 0-.1 0-.1 .1v-.1c0 0-.1 0 0 0q0 .1-.1 .1c0 0-.1-.1-.2 0c0 0-.1 0-.2 0c0 0-.1 0-.1 0q-.1 .1-.2 0c-.6 0-1.1-.1-1.6-.3c-.4-.2-.9-.4-1.4-.6q0-.1 0-.1c-.8-.7-1.4-1.7-1.8-2.9c-.4-1.1-.6-2.4-.7-3.9h-.1c-.1 .8 0 1.6 .2 2.3c.2 .7 .3 1.4 .5 2c-.3-.6-.5-1.2-.6-1.9c-.1-.7-.2-1.4-.3-2.1c.1-.9 .2-1.9 .3-3c.2-1 .4-2.2 .7-3.4c.3-1.1 .7-2.4 1.3-3.7c.6-1.3 1.4-2.6 2.3-4.1v-.1l.5-.7q0 .1 0 .1l.4-.4c0-.2 .1-.4 .3-.5c.1-.1 .2-.3 .3-.4l1.3-1.3q-.1 0-.1 0c.2-.1 .3-.2 .4-.3c.2 0 .3-.1 .4-.2q.1 0 .1 0c.2 0 .3-.1 .5-.2c.1-.1 .2-.1 .3-.2c0 0 0-.1 0-.1c0 .1 0 0 0 0c.2-.2 .4-.3 .6-.4c.2-.1 .4-.2 .6-.3v.1q.1-.1 .2-.1c0 0 .1-.1 .2-.1q.1 0 .1 0q.1 0 .1 0c0 0 .1 0 .2 0c.1 0 .2 0 .3 0q.1 0 .2 0h.2c.1 0 .2 .1 .4 .1c.1 0 .2 0 .3 .1l.4 .2c.1 .1 .2 .1 .3 .2c0 0 .1 0 .3 .1c.1 .1 .3 .3 .4 .4c.1 .1 .2 .3 .2 .5c.2 .1 .3 .2 .4 .4v.1c.2 .2 .3 .3 .5 .5c.1 .2 .2 .3 .3 .5c.2 .4 .3 .7 .4 1.1c.1 .4 .2 .8 .2 1.3c0 .2 0 .5 0 .8c0 .3-.1 .6-.1 .9c0 .3 0 .6-.1 .8c0 .2-.1 .4-.2 .6c-.1 .1-.2 .2-.4 .2c-.1 0-.2 .1-.3 .2c-.2 0-.3 0-.5 0c-.1 .1-.2 .1-.3 .1l-.3-.2l-.5-.3l-.3-.1c-.1-.3-.1-.6-.1-.9c0-.3 .1-.6 .1-.9c0-.3 .1-.6 .1-.9c0-.4 0-.7-.1-1c0-.4-.1-.6-.1-.9c-.1-.2-.2-.5-.4-.8c0-.2-.1-.3-.2-.5c-.1-.1-.2-.2-.3-.3l-.4-.1q-.1 0-.1 0c.1 0 .1 .1 .1 .1q-.1 0-.2 0c0 0-.1 0-.1 .1c-.3 .2-.5 .5-.8 .7c-.3 .2-.5 .4-.7 .7c-1.2 1.1-2.2 2.3-3 3.7c-.9 1.3-1.6 2.8-2.2 4.4c.1 0 .2 .1 .2 .1c0 0-.1 0-.2 0v-.1q0 .1-.1 .1h.1l-.1 .5c-.1 .1-.2 .4-.2 .7c-.1 .4-.2 .7-.3 1.1c0 .4-.1 .7-.2 1.1c0 .3-.1 .6-.1 .8c-.1 .4-.1 .8-.1 1.2c0 .3 0 .7 0 1.1c0 .3 .1 .7 .1 1.1c.1 .4 .2 .8 .2 1.2c.1 .5 .3 .9 .4 1.3c.1 .5 .3 .9 .4 1.3c.2 .3 .4 .6 .6 .8c.2 .3 .4 .5 .6 .7l.3 .3c0 0 .1 0 .3 0c.2 0 .3 .1 .3 .1l.8 .1c.1 0 .2 0 .3 0l.9-.2c.2-.1 .5-.2 .7-.4c.2-.1 .5-.3 .8-.4l.1-.1c.4-.2 .8-.4 1.2-.7c.4-.3 .8-.5 1.2-.8c.2-.1 .4-.2 .6-.4c.1-.1 .3-.2 .4-.3c.1-.2 .3-.3 .4-.4q.1-.1 .2-.1c0 0 .1 0 .1-.1q.1 0 .1 .1l.2-.1h.1c.1 0 .2-.1 .2-.2c.1-.1 .2-.1 .2-.2c0 .2 0 .3-.1 .4c-.2 0-.3 .1-.3 .2c0 0 .1 0 .1-.1c.1 0 .1-.1 .2-.1v.1q0-.1 .1-.1l.1-.1c0 .1 0 .2-.1 .2c-.1 0-.1 .1-.1 .2l-.6 .3c0 .1 .1 .1 .1 .1c0-.1 .1-.1 .1-.1c0 .1-.1 .1-.1 .1c-.1 0-.1 .1-.1 .1c0 0-.1 .1-.1 0c0 0 0 .1 0 .1q.1 0 .1 .1c0 0 .1 0 .1 0q0-.1 .1-.1v.1c.1 0 .2-.1 .3-.2c.1 0 .1-.1 .2-.2q.1 0 .1 0q.1-.1 .2-.2c0 0 .1-.1 .1-.1v.1c-.1 0-.1 .1-.1 .1v.1c-.4 .2-.7 .5-1.1 .7c-.3 .2-.7 .5-1.1 .7v.1c0 0-.1 0-.2 0c0 0-.1 .1 0 .2q-.1 0-.2 .1l-.1 .1c.3-.2 .6-.3 .8-.5c.3-.2 .5-.4 .8-.6c-.1 .2-.2 .3-.4 .3c-.1 .1-.3 .2-.3 .4l.1-.1h.1c0 0 0 .1 0 0c0 0-.1 .1-.1 .1c0 0 0 .1-.1 .1h-.1v.1c0-.1-.1-.1 0-.1c0 .1-.1 .1-.1 .1c-.1 0-.2 0-.3 .1q-.1 .1-.2 .1c0 0 0 .1-.1 .1q-.1 .1-.1 .1l.2-.1v.1q.1-.1 .2-.1h.1c.1 0 .2-.1 .3-.1c.1-.1 .2-.2 .3-.2c-.2 .1-.3 .2-.5 .3q-.2 .1-.3 .2q-.1 0-.1 0c0 0 0 .1 0 .1c-.1 .1-.2 .1-.2 .1c-.1 .1-.2 .1-.1 0q-.1 0-.1 0q0 .1 0 .1l-1 .5Zm-11.3-6.6v.1q0 .1 0 .1c.1-.1 .1-.2 0-.2Zm.9 4c-.1-.1-.1-.2-.1-.3c0-.1 0-.2-.1-.3c-.1 0-.1-.1-.1-.2q0-.1 0-.2c0 0-.1 .1-.1 .1l.4 1.2c.1 0 .1-.1 .1-.1q0-.1-.1-.2Zm.5 1.5c0-.1 0-.2-.1-.3c0 0 0-.1 0-.2c-.1-.1-.1-.2-.1-.3q-.1-.1-.2-.2c0 .2 .1 .4 .2 .5c0 .2 .1 .3 .1 .5Zm-.1-2.6c0 .1 0 .2 0 .3c0 .1 .1 .2 .1 .3l-.2-.9Zm.1 2.7l.1 .1c0 .1 .1 .1 .1 .1l-.1-.1c0 0-.1-.1-.1-.1Zm.3-1.8c0-.1 0-.2 0-.3c-.1-.1-.1-.2-.1-.3c0 .2 0 .4 .1 .6Zm-.1 .3c0 .2 .1 .3 .1 .4Zm.5 1c-.1 0-.2-.1-.2-.3c-.1-.2-.2-.3-.3-.3l.4 .6c0 .1 0 .2 0 .2c0 .1 0 .2 0 .3c.1 0 .2 .1 .3 .2c.1 .1 .2 .2 .3 .2c-.3-.3-.5-.6-.6-.9l.1 .1Zm-.4-1.3c0 0 .1 .1 .1 .2q0 .1 0 .2c.1 .1 .1 .2 .2 .1c-.1 0-.1-.1-.1-.2c-.1-.1-.1-.2-.2-.3Zm.3 .7c.1 .5 .3 .9 .6 1.2c0 0 0 .1 .1 .2c0 0 .1 .1 .1 0c-.2-.2-.3-.4-.5-.7c-.1-.2-.2-.5-.3-.7Zm.2-3.8c-.1 .1-.1 .2-.1 .4c.1 .1 .1 .2 .1 .4q.1 0 0-.1c0 0 0-.1 0-.2Zm.1 6.4c-.1 0-.1-.1-.1-.1q.1 0 .1 0c-.1 0 0 .1 0 .1Zm.1-4.1q0 .1 .1 .2c0-.1-.1-.2-.1-.2Zm.5 3.2c.1 .2 .1 .3 .2 .3c.1 .1 .1 .2 .2 .2c0-.1-.1-.1-.1-.2c-.1-.1-.2-.2-.3-.3Zm.2-.1c0 0 0 .1 .1 .2c0 0 0-.1 0-.1c0 0-.1-.1-.1-.1Zm.1-.6c0 0 .1 .1 .1 .1c.1 .1 .2 .1 .3 .2c.1 .1 .2 .2 .2 .3c.1 .1 .2 .2 .3 .3c-.1-.2-.3-.4-.4-.5c-.1-.1-.3-.3-.5-.4Zm.1 .9q0 .1 .1 .1q0-.1-.1-.1Zm.3 .4c.1 0 .2 .1 .2 .2c.1 0 .1 .1 .1 0l-.1-.1c0-.1-.1-.1-.2-.1Zm.8-14.3c-.1 .3-.2 .6-.3 .8c-.1 .3-.1 .5-.2 .7c.2-.5 .4-1 .6-1.5c.2-.5 .4-.9 .6-1.4c-.1 .1-.2 .2-.2 .3c-.1 .1-.1 .3-.2 .4Zm-.5 13.9q.1 .1 .2 .1q.1 .1 .2 .2c-.1-.1-.1-.2-.2-.2c0 0-.1 0-.2-.1Zm.4-20.2c.1 .1 .1 .2 0 .3c-.1 .1-.1 .2-.2 .3c0-.1 0-.2 .1-.3c0-.1 .1-.2 .1-.3Zm.8-.6l.1-.1Zm.4-.3c-.1 0-.1 .1-.1 .1ZM666.8 49c0 0 .1 0 .1 0v-.1q-.1 0-.1 .1Zm.1 0q.1-.1 .2-.2c.1 0 .2 0 .2 0c0 0-.1 0-.2 .1q-.1 0-.2 .1Zm.2-.2c.1 0 .1-.1 .1-.1l-.1 .1Zm.1-.1c.1 0 .2 0 .3-.1c.1 0 .2 0 .3-.1c0 0 .1 0 .1 0c-.2 0-.3 0-.4 .1c-.1 0-.2 .1-.3 .1Zm1.2-23.8c0 0 .1 0 .1 0q.1 0 .2 0q-.1 0-.1 0Zm.9 22.4l.4-.4c0 0-.1 0-.1 0c0 0-.1-.1-.1-.1v.3q-.1 0-.1 0c0 0-.1 0-.1-.1c-.1 .2-.3 .2-.5 .3c-.2 .1-.3 .2-.4 .4c.1 0 .1-.1 .2-.2c0-.1 .1-.1 .1 0c.1 0 .1-.1 .2-.1c.1 0 .2-.1 .3-.1Zm-.8 .7c-.1-.1 0-.1 0-.1Zm0 .5c.2-.2 .5-.3 .7-.5c.3-.1 .5-.2 .8-.3c-.2 .1-.5 .3-.7 .4c-.3 .1-.6 .3-.8 .4Zm.5-.6q0 .1-.2 .1Zm.3-.6v-.1Zm.5 0c0 0-.1 0-.2 .1q-.1 0-.2 .1q.1-.1 .2-.1q.1-.1 .2-.1Zm0-.3c-.1 .1-.1 .2-.1 .2c0 0 0-.1 0-.1q.1 0 .1-.1Zm.3 .2c0 0-.1 .1-.3 .1Zm.3 .2c-.1 .2-.2 .3-.3 .3Zm-.2-.2c0 0-.1-.1 0-.1c0 0 0-.1 0-.1q.1 .1 .1 .1q-.1 0-.1 .1Zm.2 0q-.1 0-.1 0c0 0 0-.1 .1-.1Zm.4-1.1q0 .1 0 .1Zm0 .4q.1-.1 .2-.1Zm.3-21.6c.1 0 .1-.1 0-.2Zm.2 20.8c0-.2 .1-.2 .2-.2c.1-.1 .2-.1 .3-.2c.1 0 .2-.1 .3-.2c-.1 .1-.3 .2-.4 .3c-.2 .1-.3 .2-.4 .3Zm.3 .2c-.1 0-.1 .1-.2 .1c0-.1 .1-.1 .2-.1Zm.7-1.4c0 .1-.1 .1-.1 .2c-.1 0-.1 .1-.2 .1v-.1l-.1 .1c0 0-.1 0-.1 .1c0 0-.1 .1-.2 0c.2-.1 .3-.2 .4-.2c.1-.1 .1-.2 .2-.3q.1 .1 0 .1q-.1 0-.1 .1q.1 0 .1 0c0-.1 .1-.1 .1-.1Zm-.5 .9c.1 0 .1 .1 0 .1c0 0 0-.1 0-.1Zm.3-.1q-.1 .1-.1 .1q-.1 .1-.1 0h.1l.1-.1Zm.1-.1q0 .1 0 .1q-.1 0-.1 0c0 0 0-.1 .1-.1Zm-.1-.1q0-.1 .1-.1Z' class='g0'/%3E%0A%3Cpath d='M682.7 37.9c0 0 .1 0 .1-.1c0 .1 0 0 0 0c0-.1 .1-.2 .1-.2q0 .1 0 .1q0 .1 0 .1c0 0 0-.1 0-.2h.1c.1-.2 .2-.3 .3-.5c.1-.1 .2-.3 .4-.4c0 .1-.1 .2-.2 .2q0 .1 0 .2l.2-.2l-.2 .3h-.1c0 .2-.1 .3-.2 .4c0 .2-.1 .3-.3 .4q.1 0 .1 0c-.1 0 0 0 0 0l-.4 .7c.1 0 .1-.1 .1-.1q.1-.1 .2-.1q-.1-.1 0-.1c0 0 0-.1 0-.1q0 .1 0 .1c.1-.1 .2-.2 .2-.3c0-.1 .1-.2 .2-.3q0 .1 0 .1c0 0 0 .1 0 .1c-.1 .2-.2 .3-.3 .4c-.1 .1-.1 .3-.2 .4q0 .1 0 .1l-.1 .1c0 0-.1 .2-.3 .5c-.2 .2-.5 .5-.7 .8c-.3 .3-.5 .6-.7 .8c-.2 .3-.3 .5-.4 .5v.2c0 0-.1 0-.1 0l.1-.1l-.2 .2q0 .1-.1 .1v.1c-.1-.1-.1 0-.1 0q0 .1 0 .2h-.1c-.1 0-.1 .1-.2 .1v.2c-.1 0-.1 .1-.2 .1c-.1 .1-.2 .2-.3 .3c0 0-.1 .1-.1 .1c-.1 0-.1 .1-.1 .1c.2-.1 .4-.3 .7-.5c-.2 .1-.3 .3-.5 .4c-.1 .1-.3 .2-.5 .3h.1c0 .1-.1 .1-.1 .1q-.1-.1-.2 0h.1c0 0-.1 0-.1 0h-.1c.1 0 0-.1-.1 0q0-.1 0 0c-.2 0-.3 0-.5 0c-.1 0-.2 0-.3 0c0 0-.1 0-.1 0q-.1-.1-.1-.1c-.1 0-.2-.1-.3-.1c-.1-.1-.2-.1-.3-.1q0-.1-.1-.3c-.1-.1-.1-.2-.1-.3c-.2-.4-.3-.8-.3-1.3c0-.5 0-1 0-1.4c-.2 .2-.4 .5-.6 .7c-.1 .2-.3 .5-.5 .7v.1c-.2 .2-.4 .4-.6 .6c-.2 .2-.3 .3-.6 .5v.1c-.1 .1-.3 .1-.4 .2c-.2 .1-.3 .1-.5 .2c-.1 0-.3 .1-.4 .1c-.2 0-.4 0-.5 0c-.2 0-.3 0-.4 0c-.1 0-.3 0-.4 0c-.1-.1-.2-.1-.3-.1c-.2-.1-.3-.1-.4-.2c-.1 0-.2-.1-.2-.3c-.1-.1-.1-.3-.2-.5c0-.2 0-.4 0-.6c0-.2 0-.4 .1-.6c0-.6 .2-1.1 .4-1.7c.2-.6 .4-1.1 .7-1.6c.1-.2 .2-.5 .4-.7c.1-.2 .3-.5 .4-.7c.1-.1 .1-.2 .2-.3c0-.1 .1-.2 .2-.3c.4-.5 .9-1 1.5-1.4c.1-.1 .3-.2 .6-.3c.3-.1 .5-.1 .7-.1c.3 0 .5 0 .6 0q.2 0 .1 0c0 0 .1 0 .1 0c0 .1 .1 .1 .1 .1c0 0 .1 0 .1 0h.1q.1 .1 .2 .1c.1 0 .1 .1 .2 .1c.1 0 .1 .1 .2 .2c0 0 .1 0 .2 0c.2 .2 .5 .3 .6 .4c.2 .1 .4 .2 .7 .4v.1q0 .1-.1 .1c0 0-.1 .1-.1 .1c-.1 0-.2 0-.2 0c-.1 0-.2 0-.3 .1c0 0 0-.1 0-.1q-.1 0-.2 0h-.1c-.1-.1-.2-.1-.3-.1c-.1 0-.2-.1-.3-.1c-.1 0-.2-.1-.3-.1c-.1-.1-.2-.1-.4-.2c-.1 0-.2 0-.3 0c-.1-.1-.2-.1-.3 0q-.1 0-.1 0c-.1 0-.2 .1-.2 .1c-.6 .6-1.1 1.2-1.5 1.8c0 0 0 .1 0 .1l-.4 .7c0 0 0 .1 0 .1q0 .1-.1 .2c0 0 0 .1 0 .1c-.1 .1-.2 .2-.2 .3c-.1 .2-.1 .3-.2 .4c0 .1-.1 .2-.1 .2c-.1 .1-.1 .2-.1 .3c-.1 .3-.2 .7-.3 1.1c-.1 .4-.2 .8-.1 1.3c.3-.2 .5-.4 .7-.7c.2-.2 .4-.5 .6-.7c.1-.2 .2-.3 .4-.5c.1-.1 .2-.2 .3-.4c.2-.2 .4-.5 .6-.7c.2-.3 .3-.5 .5-.7q0-.1 0-.1c0 0 0 .1 .1 .1c.1-.3 .3-.6 .6-.9c.2-.3 .4-.6 .5-.8h.1V36q.1 0 .2-.1c0-.1 .1-.1 .2-.1v-.1h.1c0-.1 .1-.1 .1-.1q.1 0 .1 0c0 0 .1 0 .1 0h.1c0 0 .1-.1 .2 0c.1 0 .2 0 .2 .1c0 0 0-.1 0-.1q.1 0 .1 0q0 .1 0 .1c0 0 .1 0 0-.1v-.1q.1 .1 .1 .2c-.1 .1 0 .1 .1 .1v-.1q0 .1 0 .2c0 0 .1 .1 .1 .2c.1 0 .2 .1 .2 .2c0 .1 0 .2-.1 .4c0 .1-.1 .3-.1 .4c.1 .2 .1 .4 0 .6c-.1 .2-.2 .5-.2 .7c-.1 .1-.1 .3-.1 .4c0 .2-.1 .3-.1 .5c0 .4-.1 .8-.1 1.1c-.1 .3 0 .6 .1 1.1c-.1 .1-.1 .2-.1 .4c.1 .1 .1 .2 .1 .4c.2-.1 .3-.1 .3-.2c.1-.1 .2-.2 .3-.3c.1-.1 .3-.2 .4-.4c.2-.1 .3-.3 .4-.5c.1 0 .2-.2 .4-.4c.2-.2 .4-.4 .6-.7c.2-.2 .4-.5 .6-.7c.2-.2 .3-.4 .4-.4c.1-.1 .1-.2 .1-.2c0-.1 .1-.1 .1-.1c.1 0 .2-.1 .2-.2c.1-.2 .2-.3 .2-.3c.1-.1 .1-.2 .2-.2c0-.1 .1-.2 .1-.2q0-.1 .1-.1q0-.1 0-.2h.1l.1-.1q0 .1 0 .2q-.1 .1-.1 .1q0 .1 0 .1q0 .1 0 .1q-.1 .2-.1 .3Zm-6.3 1.7c-.1 .1-.1 .2-.2 .3c0 .1-.1 .2-.2 .4Zm-.1 0c0-.1 .1-.1 0-.2Zm.1-.2q-.1 0 0 0Zm3.8 2.9q0 .1-.1 .1l.1-.1Zm2.4-3.5c.1 0 .1-.1 0-.1c0 0 0 .1 0 .1Zm.3-1.3q0 .1-.1 .1Z' class='g0'/%3E%0A%3Cpath d='M687 36.9V37q-.1 0 0-.1c-.2 .1-.4 .3-.6 .5c-.2 .2-.3 .4-.4 .5c0 0-.1 0-.1 0q0 .1 0 .1q-.1 0-.1 .1c-.1 0-.1 .1-.1 .1l-.2 .2v.1c-.1 .1-.2 .2-.3 .3c0 .1-.1 .2-.2 .4l-.4 .7v.2c0 .1 0 .2 0 .2c0 .1-.1 .1-.1 .2v.1c0 .1 0 .2 0 .4c-.1 .2-.1 .4-.1 .6c-.1 .1-.1 .2-.1 .3c0 .1 0 .3 0 .4c0 .1 0 .3 0 .5c-.1 0-.1 .1-.1 .1c0 .1-.1 .1-.1 .1c0 0 0 .1 0 .1c0 0-.1 .1-.1 .2c.1 .1 0 .1 0 .2q0-.1 0-.2q0-.1 0-.2c0 .1 0 .2 0 .3c0 0 0 .1-.1 .2c0 0-.1 0-.1 0c-.1 0-.2 .1-.3 .1q-.2 0-.3 0c0 0 0 .1 0 .1q0 .1-.1 .1v-.2v.2c-.1 0-.1-.1-.1-.1c0 0 0-.1 0-.1q0 .2-.1 .2v-.1c0 0 0-.1 0-.1q-.1 .1 0 .2q-.1 0-.2 0q-.1 0-.2-.1l-.1 .1h-.2c-.1 0-.1-.1-.1-.1c0 0-.1 0-.1-.1c-.1 0-.1 .1-.1 .1q0 .1 0 .1c-.1 0-.2-.1-.2-.2c0-.1-.1-.2-.1-.3c0-.3 0-.6 .1-.9c.1-.3 .1-.7 .2-1l.1-.5c0-.3 0-.5 0-.6c.1-.1 .1-.2 .1-.3c0-.1 0-.2 0-.3c.1-.1 .1-.3 .1-.6l.3-.6c0 0 0-.1 0-.1c0 0 0-.1 0-.1c.1-.5 .2-.9 .3-1.4c.1-.6 .2-1.1 .3-1.6v-.1c0 0 0-.1 0-.3h.1c0 0 0-.1 0-.1c0-.2 .1-.3 .2-.4c.2 0 .3-.1 .4-.3c.1 0 .2 0 .4 0c.2 0 .3 0 .4-.1c.1 0 .1 .1 .1 .1c0 0 .1 0 .1 0c.1 .1 .3 .2 .4 .3c.2 0 .4 .1 .5 .3c0 .1 .1 .2 0 .4c-.1 .2-.1 .3-.1 .5c-.1 .2-.1 .4-.2 .7c0 .2 0 .4-.1 .7l.4-.3c.3-.3 .6-.5 .8-.6c.3-.1 .6-.3 .9-.5c.1 0 .2 0 .3-.1c.1 0 .2 0 .4 0c.1 0 .2 0 .3 .2h.3q.1 .1 .1 .3V36c0 0-.1 0-.1 0q0 .1-.1 .1c0 0 0 .1 .1 .1q-.1 0-.2 0c0 0 0 .1-.1 .1c0 0-.1 0-.1 0c0 0-.1 0-.1 0q-.1 0 0 .1q-.2-.1-.3-.1c0-.1-.1-.1-.1 0h.1v.1c-.1 .1-.2 .2-.2 .2c-.1 .1-.2 .1-.3 .1c0 0 .1-.1 .1-.1l-.1 .1h-.1c0 0 0 .1-.1 .1l-.1 .1H687Zm-1.9 2.3c0 .1-.1 .2-.1 .2Z' class='g0'/%3E%0A%3Cpath d='M691.7 44.3q0 .1-.1 .1c-.1 0-.2 0-.4 .1c-.2 0-.3 0-.3 .1q-.1 0-.2 0h-.1q-.1 0-.2 0c-.1 0-.2 0-.3 0c0 0-.1-.1-.1-.1c-.1 0-.2-.1-.2-.1c0 0-.1-.1-.1-.1c-.1 0-.1-.1-.2-.1c0 0-.1 0-.1 0c0 0-.1-.1 0-.1c-.1 0-.2 0-.3 0l-.3-.4c-.1-.1-.1-.3-.1-.4c0-.2 0-.3 0-.5c-.1-.1-.1-.3-.1-.4c.1-.1 .1-.3 .1-.4c0-.2 0-.3 .1-.4q0-.1 0-.2c0-.1 0-.2 0-.3c.1-.1 .1-.2 .1-.3c0-.1 0-.2 0-.3h.1v-.1c0 0 0-.1 0-.2c0-.1 0-.2 .1-.2c0 0 0-.1 0-.1q0-.1 0-.2v-.1l.2-.5V39l.2-.8c0-.1 0-.2 0-.2c0-.1 0-.2 0-.3c.1-.3 .1-.4 .2-.5c0-.1 .1-.2 .1-.3c.1-.1 .1-.2 .2-.3c0-.1 .1-.3 .2-.5c0-.2 .1-.3 .2-.5c0-.1 .1-.2 .1-.4c.1 0 .2 0 .2 0c0 0 .1-.1 .1-.1c.1 .1 .2 .1 .3 .1c.1 0 .2 0 .3 0c.1 0 .2 0 .2 0c0 0 .1 .1 .2 0c0 .1 .1 .1 .2 .1c.1 .1 .2 .1 .2 .1c.1 0 .2 0 .3 .1c.1 .1 .2 .1 .2 .2c.1 0 .1 .1 .1 .1c.1 .2 .1 .3 .1 .5c-.1 .2-.1 .3-.1 .5c-.1 .3-.2 .7-.3 1c-.1 .3-.2 .6-.2 .9c-.1 .3-.2 .6-.3 .9c-.2 .3-.3 .6-.4 1c0 .1-.1 .3-.2 .6c0 .3-.1 .6-.1 .8c0 .3 0 .6 .1 .8c.1 .3 .2 .4 .5 .4c.1 0 .2 0 .2-.1c0 0 .1-.1 .1-.1c0 0 0-.1 .1-.2c.3-.2 .6-.5 .8-.7c.3-.3 .6-.6 .8-.8c.1-.3 .3-.5 .5-.7c.2-.2 .4-.4 .6-.6c0 0 .1-.1 .1-.1c0-.1 0-.2 .1-.2c0 0 .1-.1 .1-.2c.1 0 .2-.1 .2-.1c.1-.2 .2-.3 .3-.4c.2-.2 .3-.3 .3-.5q.1-.1 .2-.1l.1-.2c.1 .1 .1 0 .1 0q0-.1 0-.1h.1c0 0 .1-.1 .2-.1c0-.1 .1-.1 .1-.1c.1-.2 .1-.3 .1-.3c0-.1 .1-.2 .1-.2c.1 0 .1-.1 .1-.1c0-.1 .1-.1 .1-.1c-.1 .1-.1 .2-.2 .2c0 .1 0 .2-.1 .3c.1-.1 .2-.2 .2-.2q.1 0 .1 0c-.1-.1 0-.1 0 0c.1-.2 .2-.3 .3-.3c0-.1 .1-.2 .1-.3q.1 0 .1 0h.1c0 .1 0 .2-.1 .3c0 0 0 .1-.1 .3c0 .2 0 .3-.1 .4c0 0 0 .1-.1 .2q0 .1 0 0v.1l-.1 .1c0 0 0 .1 0 .1c-.1 .1-.3 .2-.4 .4c-.2 .2-.3 .3-.4 .5c.1-.1 .2-.1 .3-.2c0 0 .1-.1 .2-.1c-.1 0-.1 .1-.2 .2c-.1 .1-.2 .2-.2 .2h-.1v.1q0 .1 0 0c0 0-.1 0-.1 0l-1.4 2c-.2 .2-.4 .3-.5 .5c-.2 .2-.3 .3-.5 .4c-.4 .4-.7 .7-1.1 1.1c-.4 .3-.8 .6-1.3 .8Zm2.1-12.9c.1 0 .2 0 .3 .1c.1 .1 .2 .1 .3 0c.1 .1 .1 .2 .2 .2c0-.1 .1 0 .2 .2c0 .1 0 .2 .1 .2c0 .1 0 .2 0 .3l-.2 .2c-.2 .1-.3 .3-.3 .4c-.1 .2-.1 .4-.2 .5q-.1 0-.1 0c.1 0 .1-.1 0-.1q0 .1 0 .1q0 .1 0 .2q-.1-.1-.1 0h-.1c0 0-.1 0-.1 0q-.2 0-.2 .1c0 0-.1-.1-.1 0q-.1 0-.3 0c0 0 0-.1 0-.1l-.1 .1H693c0-.1-.1-.1-.1-.1q-.1 0-.1 .1q.1 0 .1 0c-.1 0-.2-.1-.4-.1q0 .1 0 .1c-.2 0-.3 0-.3-.1h-.4c-.1-.3-.2-.5-.2-.9c.1-.3 .1-.6 .3-.8c0-.1 .1-.2 .1-.2c.1-.1 .1-.2 .2-.3c0 0 0 .1 .1 .1v-.1c0 0 .1 0 .2 0c.1-.1 .2-.1 .3-.1c0-.1 .1-.1 .3-.1c.1 0 .3 .1 .4 .1Zm-2.2 13h.1Zm1.2-10.5v-.1q0 .1 0 .1Zm4.2 5c.1 0 .1 .1 0 .1q0-.1 0-.1Zm.4-.4c0 0 0 .1-.1 .1c0 0-.1 .1-.2 .2c.1-.1 .2-.2 .3-.3Zm-.2 .3c0 0-.1 0-.1 0c0 0 .1 0 .1 0Zm.1-1.7v.1h-.1q.1-.1 .1-.1Zm.1 1.5c0 0 0 .1 0 .1q-.1 0-.1 0c0 0 0-.1 .1-.1Zm.2-.4q0-.1 .1-.2Zm0 0v.1v-.1Zm.1-.2c0 0 0-.1 0-.1Z' class='g0'/%3E%0A%3Cpath d='M704.7 43.5c0-.1-.1 0-.1 0c0 0-.1 0-.1 .1c-.1 0-.1 .1-.1 .1q-.1 0-.1 0h-.2q0 .1 0 .1q-.1 .1-.1 0c0 0-.1 0-.1 .1c0 0-.1 .1-.1 .2h-.1h.1c-.1 .1-.3 .1-.4 .1c-.2 0-.4 .1-.5 .2c-.1 0-.2 0-.3 .1c-.1 0-.2 0-.3 0c.1-.1 .2-.1 .2-.1c.1 0 .2 0 .3 0c-.2-.1-.4-.1-.5 0c-.2 .1-.4 .1-.6 0q.1 0 .1 0q.1 0 .1 0q0-.1 0-.1c0 .1 0 0 0 0c-.1-.1-.2-.1-.3-.1c0-.1-.1-.1-.2-.1c-.1-.2-.3-.3-.4-.4c-.1-.2-.2-.3-.2-.5c-.1-.4-.2-.8-.1-1.1c0-.4 .1-.7 .2-1.1c.1-.3 .2-.7 .4-1.1c.1-.3 .3-.7 .4-1.2c.3-.7 .4-1.3 .4-1.6c0-.4-.1-.5-.5-.4c0 0-.1 0-.2 .1c0 .1-.1 .1-.1 .2c0 0-.1 0-.1 0c0 0-.1 .1-.1 .1h-.2c0 .1-.1 .1-.1 .1q-.1 .1-.1 .1c-.3 .3-.5 .5-.7 .7c-.2 .2-.4 .4-.7 .6v.1c0 0-.1 0-.1 0c0 0-.1 0-.1 .1q-.1 .1-.2 .2c0 0 0-.1 .1-.1q-.1 0-.1 .1v.1q0-.1 0-.1c0 .1 0 .3-.1 .7c-.1 .3-.2 .7-.3 1.1c-.1 .3-.2 .7-.4 1c-.1 .3-.2 .5-.3 .5c0 0 0 .1-.1 .1h-.1c0 .1 0 .2-.1 .2q0 .1 .1 .2l-.2-.1q-.1 0 0 0q-.1 0-.1 0c.1-.1 0-.1 0 0v.1c0 0 0 .1 0 .1h-.1l-.1-.1l-.1 .3c0 0-.1 0-.1-.1c0 0-.1 .1-.1 .1c-.1 0-.2 0-.3 0c-.1 0-.2-.1-.2-.1c-.1 0-.3 .1-.4 .2h-.1c0 0 0 .1 0 .1c-.1 0-.1-.1-.1-.1q-.1 0-.2 0c0-.2 0-.4 0-.6c0-.2 .1-.4 .2-.7c0 0-.1 0-.1 0c0 0-.1 0-.1 0c.1 0 .2 0 .2-.1l.3-1.3v-.1q-.1 0-.1-.1l.2-.5c0-.2 .1-.3 .1-.5c.1-.2 .1-.3 .1-.5l.3-1.3l.2-1c0 0 0-.1 .1-.1c0 0 0-.1 0-.1v-.1c.1-.2 .1-.3 .1-.3c-.1 0-.1-.1 0-.3c0 0 0-.1 .1-.3c.1-.1 .1-.2 .2-.2c0-.2 .1-.3 .2-.4c.1-.1 .2-.2 .3-.2c.1 0 .2-.1 .4-.1c.1 0 .2-.1 .3-.2c.1 0 .1 .1 .1 .1q.1 0 .2-.1c.1 .1 .2 .1 .2 .1q.1 0 .2 0c.2 .1 .3 .2 .5 .3c.1 .1 .2 .3 .1 .4l-.1 .7V36l-.3 1.4l.4-.5c.1-.1 .3-.2 .5-.4c.2-.1 .4-.3 .5-.4c.1-.1 .2-.1 .3-.2c.1 0 .2-.1 .3-.2c.4-.2 .7-.4 1-.6c.3-.2 .6-.3 1-.4c0 0 .1 0 .1 0c0 .1 .1 0 .1 0c.1 0 .2 0 .3 0c.1-.1 .2 0 .2 .1c.1 0 .2 0 .3 0c.1 0 .2 .1 .2 .1V35l.1 .1h.1v.1v-.1h.1c0 .2 0 .3 0 .3c.1 0 .1 .1 .2 .1c0 .1 0 .2 0 .3c0 0 0 .1 0 .1c0 .1 0 .2 0 .2c0 0 0 .1 0 .2c0 0 0 .1 0 .2c0 .2-.1 .3-.1 .4c0 .2-.1 .5-.2 .7c-.1 .3-.2 .5-.3 .7c-.1 .4-.2 .8-.3 1c-.2 .3-.3 .5-.4 .7c-.1 .3-.2 .5-.3 .7c-.1 .3-.2 .6-.3 1c0 .3 0 .6 0 .9c.1 .1 .2 .2 .3 .2c.1 0 .2 0 .4 0c.1-.1 .2-.2 .4-.2c.1-.1 .2-.2 .3-.2q.1-.1 .1 0l.1-.1h.1c.1-.1 .2-.2 .3-.2c.2-.1 .3-.2 .4-.3q0-.1 .1-.1c0 0 .1-.1 .1-.1c.1 0 .1-.1 .2-.2l.7-.4c.1-.2 .2-.3 .2-.3c.1 0 .1-.1 .1-.1q.1 0 .2-.1c0 0 .1-.1 .2-.3c.1 0 .2-.1 .2-.2c.1-.1 .1-.2 .2-.3h.1c0-.1 .1-.2 .1-.2q.1-.1 .2-.2c.1-.1 .1-.2 .2-.1c0 0 .1-.1 .2-.2l.2-.5c0 .2 0 .3-.1 .4c-.1 .2-.1 .3-.1 .3c.1 0 .2-.1 .3-.2c0-.2 .1-.3 .3-.3l-.2 .1c.1 .1 .1 0 .1 0q0 .1 0 .1V39h.1c-.2 .3-.3 .5-.4 .6c-.1 .2-.2 .3-.3 .4c-.1 .2-.2 .3-.3 .4c-.2 .1-.3 .3-.5 .5c-.1 .1-.2 .1-.2 .2q-.1 .1-.2 .2q-.1 0-.1 0c.1 0 0 0 0 0c-.1 .2-.2 .2-.2 .3q0 .1 0 .1q-.1 .1-.1 .1q-.1 .1-.2 .2c0 0-.1 0-.1 .1c0 0 0 .1-.1 .1c-.1 0-.1 .1-.1 .1c.1-.1 0-.1 0-.1q-.1 .1-.1 .2c-.1-.1-.2 0-.2 .2c0 0-.1 0-.1-.1v-.1c0 0 0 .1-.1 .1c0 .1 0 .2-.1 .2q0 .1 0 .1c0 0-.1 0-.1 0q-.1 0-.1 0c0 .1-.1 .1-.1 .1q-.1 .1-.2 .2c-.1 0-.2 .1-.2 .1c-.1 0-.1 .1-.2 .1h.1q-.1 0-.1 0q-.1 .1-.1 .1c0 0-.1 0-.1-.1v.2Zm-7.9-7.2c0 0 0-.1 0-.1c0 .1 0 .2 0 .3q-.1 .1-.1 .2Zm5.4 7.9h-.1c0 0-.1 0-.2 .1c.1 0 .2 0 .2 0c0 0 .1 0 .1-.1ZM705 43.3q0 .1 0 .1v.1q0-.1 0-.1v-.1Zm4.2-4.6l-.1 .1Z' class='g0'/%3E%0A%3Cpath d='M705.5 53.8c0 0-.1 0-.1 0q.1 0 .1 0Zm7.6-2.9v-.1c0 0 0-.1 .1-.1c0 0 0-.1 0-.1c0 0 .1 0 .1 0v-.2c.1-.2 .2-.5 .3-.8c.1-.3 .2-.6 .3-.9v.1c0 0-.1 0-.1 .1c0 0 0 .1 0 .2c-.1 0-.1 .1-.2 .1v.2q0 .1 0 .2h-.1c0 .1 0 .2-.1 .2c0 .1 0 .2 0 .2c0 .1-.1 .2-.1 .3c0 0 0 .1-.1 .1c-.1 .3-.2 .6-.3 .9c-.1 .2-.2 .5-.3 .8c-.1 0-.1 .1-.1 .1v.1q-.1 0-.1 0c0 0 0 .1 0 .1c0 .1-.1 .1-.1 .2c0 .1-.1 .1-.1 .1q-.1 .1-.1 .2q0 .1 0 .1q0-.1 0 0c0 0-.1 .1-.1 .1c-.1 0-.1 .1-.1 .2c0-.1 0 0 0 0c0 .1-.1 .1-.1 .1v.1c0 0 0 .1-.1 .1q0 .1 0 .1h-.1c-.2 .3-.4 .6-.6 .8c-.2 .3-.4 .5-.7 .7q-.1 0-.1 0h-.1c0 0-.1 0-.1 .1c-.1 .1-.2 .1-.3 .1h.1c0 0 0-.1 .1-.1c.1-.1 .2-.2 .3-.2q0-.1 .1 0V55l.1-.1l.2-.1l.1-.2l-.2 .2h-.1c0 0 0 .1 0 .1h-.1c-.1 .1-.2 .2-.3 .3c-.1 0-.2 .1-.4 .2q0 .1 0 .1c-.1 0-.2 0-.3 0c-.1 0-.2 .1-.3 .1c-.1 0-.2 0-.3 0c-.1 0-.2 0-.3 .1c-.3 0-.6 0-.9 0c-.3-.1-.6-.2-.9-.3c-.2-.1-.5-.3-.6-.5c-.2-.2-.3-.4-.4-.7c0-.2-.1-.4-.1-.6c0-.3 .1-.5 .1-.7v-.2q.1 0 .1-.1v-.1c0 0 .1 .1 .1 .1c0-.1 0-.2 0-.3c.1-.2 .1-.3 .1-.3c0 0-.1 0-.1 0c0 0 0-.1 .1-.1v-.1c0-.1 0-.2 .1-.3c0-.1 0-.2 0-.3c.1-.3 .3-.6 .4-.9c.1-.2 .2-.5 .3-.7q.1 0 .1 0c.1-.2 .2-.4 .3-.6v.1q-.1 0-.1 0l.4-.6c0 0 0-.1 .1-.2c0 0 0 .1 0 .1l.1-.1q-.1-.1 0-.2q-.1 0 0 0l.1-.1v.1V48c0 0 .1-.1 .1-.1c0 0 0-.1 .1-.1c0 0 0-.1 .1-.1c0 0 0-.1 0-.1c0 0 0-.1 .1-.1v-.1q0 .1 0 .1c0 0 0-.1 0-.1h.1v-.1c0-.1 .1-.2 .1-.2c.1-.1 .2-.1 .2-.2V47l.1-.2c.2-.1 .3-.3 .4-.5v.1c.1-.1 .2-.3 .4-.4c.1-.2 .2-.3 .3-.4q-.1 0-.1 .1q0-.1 .1-.2c0 0 .1-.1 .1-.1v-.1q.1 0 .1 0c0 0 .1 0 .1 0c.1-.1 .2-.2 .2-.3c.1-.1 .2-.1 .2-.2l.1-.1h.1c0-.1 .1-.1 .1-.1v-.1c0 0 .1 0 .1 0l.1-.1c.1-.1 .3-.2 .4-.4c.1-.1 .2-.2 .4-.3c.1 0 .2-.1 .3-.2c0 0 .1-.1 .2-.1v-.1c0 0 .1 0 .1 0c.1-.1 .2-.2 .3-.2c.1-.1 .2-.2 .3-.3l.3-1.8h-.1c.1 0 .1-.1 .1-.1c-.2 .1-.3 .3-.5 .4c-.2 .1-.4 .3-.6 .5l.4-.3h.1c-.2 .1-.3 .2-.4 .3c-.2 .1-.3 .2-.4 .3c.2-.1 .3-.2 .5-.3c.1-.1 .2-.2 .4-.3q.1 0 .2-.1c0 0 0-.1 .1-.1c-.1 .1-.3 .3-.5 .4c-.2 .1-.3 .2-.5 .4l-.2 .2c-.1 .1-.2 .1-.3 .1c0 0-.1 .1-.1 .2c0 0-.1 0-.1 .1q-.1 0-.1 0l-.1 .1c-.1 0-.3 .1-.4 .1c-.1 .1-.2 .1-.4 .1l-.1 .1c-.6 .1-1.1 0-1.5-.2c-.2 0-.5-.1-.7-.3c-.1-.2-.2-.3-.3-.5c-.1-.2-.1-.4-.1-.7c0-.5 .1-.9 .2-1.2c.2-.4 .3-.7 .4-1.1c.3-.4 .5-.8 .8-1.2c.3-.4 .6-.8 .9-1.2c.3-.3 .6-.6 .9-.9c.3-.2 .7-.5 1-.8c.1 0 .2-.1 .3-.2c.1-.1 .2-.1 .4-.1c.2-.1 .4-.2 .6-.2c.3-.1 .5-.1 .8-.1c0 0 .1 0 .1 .1c0 0 .1 0 .2 0c.2 0 .4 0 .4 0q.1 .1 .1 .1q.1 0 .2 0c.1 .1 .3 .3 .4 .5c.2 .1 .4 .3 .5 .5c0 .1 0 .2 .1 .3c0 .1 0 .2 0 .3l-.2 .3c-.1 .1-.3 .1-.4 .2c-.2 0-.3 0-.4-.2q-.1 .1-.1 0c0 0-.1 0-.1 0c0 0-.1 0-.1 0c-.1-.1-.2-.1-.2-.2c-.1-.1-.1-.2-.3-.3c0 0 0-.1 0-.1c-.1 0-.2 0-.2 .1c-.1 0-.2 0-.3 .1l-.7 .5c-.3 .2-.6 .5-.8 .7c-.2 .3-.4 .5-.7 .8c-.3 .4-.6 .9-.9 1.5c-.3 .6-.6 1.2-.7 1.8q0 .1 0 .2c-.1 .1 0 .1 0 .1c.3-.1 .6-.2 .8-.4c.4-.3 .9-.6 1.3-1c.5-.4 .9-.8 1.4-1.1c0-.2 .1-.3 .3-.4l.3-.3c0 0 0-.1 0-.2c0-.1 0-.2 .1-.2c0-.1 0-.2 .1-.3c0-.1 0-.2 0-.3c.1 0 .1-.1 .1-.3q.1 .1 .1 .1q.1-.1 .1-.2c.1 0 .1-.1 .1-.1q.1-.1 .1 0v-.1q.1 0 .1 0q.1 0 .1 .1q.1 0 .1 0q0-.1 0 0c0-.1 .1-.1 0-.1q.1 0 .1 0h.1H715l.1-.1l.1 .1v-.2c0 .1 0 .2 .1 .2q.1 0 .1 0c0 0 .1 0 .1 0v-.1c0 0 .1 .1 .1 .1c.1 0 .2 .1 .2 .2c.1 0 .2 .1 .2 .1q.1 .1 .2 .2v-.1c.1 .1 .1 .2 .2 .3c.1 .1 .1 .2 .1 .4l-.2 .4c-.1 .1-.1 .3-.2 .6c-.1 .2-.2 .5-.2 .7c-.1 .3-.2 .5-.2 .8c-.1 .3-.1 .5-.2 .7c.3-.1 .6-.3 .9-.5c.2-.3 .5-.4 .8-.5c0 0 0-.1 .1 0c0 0 .1-.1 .1-.1c0 0 .1 0 0 0c0 0 .1 0 .1 0c0-.1 .1-.1 .2-.1c.1-.1 .2-.2 .3-.2c.1-.1 .2-.1 .4-.2c.1-.1 .2-.1 .2-.1c0-.1 .1-.1 .2-.1c.1 0 .2 0 .2-.1c.1 0 .2 0 .4-.1c.1 0 .2-.1 .4-.1q-.1 0-.1 0v.1c0 .1 .1 .1 .1 .1q.1 0 .1-.1c0 0-.1 0-.1 0q0-.1 .1-.1c0 0 .1 0 .1 0c-.1 0-.1 .1-.1 .1c.1 0 .2 0 .3-.1c.1 0 .2 0 .2 0c0 0-.1 0-.1 0c0 .1 0 .2-.1 .2h.2c-.1 0-.1 .1-.2 .1q-.1 0-.2 .1h-.1v-.1c0 0 0 .1-.1 .1q0-.1 0-.1c-.1 0-.1 .1-.1 .1q-.1 0-.2 0c0 .1-.1 .1-.1 .1c-.1 0-.1 .1-.1 .1c0 0-.1 0-.1 0c.1 0 .3-.1 .5-.1v.1q0-.1 0-.1c0 .1 0 0 0 0q-.1 .1-.2 .1c-.1 0-.1 .1-.2 .2q.1 0 .2-.1q.1-.1 .2-.1c0 .1 0 .2-.1 .2c-.1 0-.2 .1-.3 .1c-.1 0-.3 .1-.4 .1c0 0-.1 0-.2 0q0 .1 .1 .1c-.1 .1-.2 .1-.3 .2c-.1 0-.3 .1-.4 .2c-.2 0-.3 .1-.5 .2c-.1 .1-.2 .1-.3 .2l-.2 .1c-.1 .1-.3 .1-.4 .2c-.1 0-.2 .1-.2 .2h.1c0-.1 .1-.1 .1-.1c.2 0 .3-.1 .4-.1c.1-.1 .2-.1 .2-.2h.1l-.6 .3c0 .1 .1 .1 .1 .1q0-.1 0-.1l-.3 .3c0-.1 .1-.1 .2-.1c0-.1 .1-.1 .2-.2c0 0 .1 0 .2-.1c0 0 .1 0 .1 0c0 0-.1 0-.1 .1h-.1c0 .1-.1 .1-.2 .1c0 .1-.1 .1-.2 .2c0 0-.1 0-.1 0q-.1 .1-.2 .1c0 0 0 .1 0 .1c-.1 .1-.2 .1-.3 .1c-.1 .1-.2 .1-.3 .2h.1c-.2 .1-.3 .2-.4 .2c-.1 .1-.2 .2-.3 .3c0 0 .1 0 .1 .1c0-.1-.1 0-.2 .1c-.1 1.1-.3 2.2-.5 3.3c-.2 1-.5 2.1-.8 3.1l-.8 2.2h-.1v-.1q.1 0 .1-.1l.1-.3l-.1 .1c0 0 .1-.1 .1-.2Zm-7.5 3.2v.1v-.1Zm.1-1.8v-.1l-.1 .2Zm0 .6q0 .1 0 .1l-.1 .2q0 .1 .1 .1l-.1 .2q.1 0 .1 .1c.1-.2 .1-.3 .1-.5c0-.1 0-.3-.1-.4Zm-.1 .8v.1q.1 0 .1-.1Zm.2-1.8c0 .1-.1 .1-.1 .2c0 0 0 .1 0 .1Zm.1-.2q0 .1 0 .1c0 0 0-.1 0-.1Zm0 2.1q0 .1 .1 .2q0-.1 0-.1c-.1 0-.1-.1-.1-.1Zm.1-2.5q0 .1 0 .2c0 0 0-.1 0-.2Zm.1-.3v.1c0-.1 .1-.1 0-.1Zm.9 .6c0 .1-.1 .3-.1 .4c0 0 0-.1 .1-.2c0-.1 0-.2 0-.2Zm0 1.5c0 0 0 .1 0 .1v-.1Zm0-.2V53c0 0 0-.1 0-.1Zm.1 .3q0 .1 0 .1c0 0 0-.1 0-.1Zm.1 .6q0-.1 0-.1q0-.1 0-.2q-.1 0-.1 .1c0 .1 .1 .2 .1 .2Zm3.4-7.9V46c0 0-.1 0-.1 0c0 0 0 .1 0 .1h-.1c0 .1-.1 .2-.2 .2c0 .1-.1 .2-.2 .3v-.1c0 .1-.1 .1-.1 .2l-.3 .3q0 .1 0 .1c-.1 .1-.1 .2-.2 .3c0 .1-.1 .1-.2 .1q0-.1 .1-.1c0-.1 .1-.2 .2-.3c-.1 0-.1 .1-.2 .2c0 .1-.1 .1-.2 .1v.2H709v.1h.1c0 0 0 .1 0 .1L709 48v-.1q0-.1 0-.1q0-.1 0-.1l-.4 .4h.1c0 0-.1 0-.1 0l-.1 .3l-.2 .2v.1c-.2 .2-.3 .4-.3 .7q0-.1 0-.1v-.1l.1 .1q0-.1 0-.1v-.1q.1-.1 .1-.1c0 0 0-.1 0-.1c0 0 0 .1 .1 .1c0-.2 0-.3 .1-.4c.1-.1 .1-.2 .2-.3c0-.1 .1-.1 .2-.2V48q.1 0 .2 0c-.2 .2-.4 .5-.5 .7c-.1 .2-.3 .4-.4 .7H708c0 .1-.1 .2-.1 .3c0 .1 0 .2-.1 .3h.1l-.3 .7l.1-.3l-.1 .6l-.1 .3c0 0 .1-.1 0-.1h.1c0 0-.1 .1-.1 .2c0 .1 0 .2-.1 .3v-.1q0 .1 0 .1v-.1h-.1q.1-.1 .1-.2c0 0 0-.1 0-.1c0 0 0 .1 0 .1q0 .1 0 .1c0-.1 .1-.2 .1-.3c0-.1 0-.2 .1-.3v-.1c0-.1 0-.2 .1-.3c0-.1 0-.2 0-.2v-.1c.1 0 .1-.1 .1-.2c-.1 0-.1 .1-.1 .1c0 .1 0 .3-.1 .4c0 .1-.1 .2-.1 .4c-.1 0-.1 .1-.1 .2c0 0 0 .1-.1 .2c-.1 .1-.1 .3-.1 .5c-.1 .2-.1 .4-.1 .5c0 .1 .1 .2 0 .3c0 0 0 .1 .1 .2c0-.1 0-.2 0-.4c0-.1 0-.3 .1-.4c0 .1 0 .3 0 .4c-.1 .2-.1 .3-.1 .4c0 0 0-.1 .1-.1q0-.1 0-.2c.1 0 .1 .1 .1 .1l-.1 .1l.1 .1q-.1 0-.1 .1c0 0 0 .1 0 .1c.1 .1 .1 .2 .1 .2q0 .1 0 .2c0 .2 0 .3 0 .4c.1 .1 .1 .2 .1 .3c0 0 0-.1 0-.2c-.1 0-.1-.1 0-.1q0 .1 .1 .2q0-.1-.1-.1h.1V54v-.1c0 .1 .1 .2 .1 .2q0 .1 0 .2l.3 .3q.1 0 .1 0h.1q.1 0 .2 0c0 0 .1-.1 .1-.1c.1-.1 .2-.2 .4-.3c.1 0 .2-.2 .3-.3l.2-.1v-.1v.1c.4-.4 .7-.9 .9-1.4c.2-.6 .5-1.1 .8-1.6c0-.3 .1-.6 .2-.9c.1-.3 .2-.6 .3-.9q.1 0 .1-.1v-.1l.3-1.5q0-.1 0 0v-.1q.1 0 0-.1q.1-.1 .1-.1c.1-.1 .1-.2 .1-.2c0-.1 0-.2 .1-.3c0 0 0-.1 .1-.3c0-.1 0-.2 0-.4l.1-.5c0-.2 .1-.5 .1-.8c.1-.2 .2-.5 .2-.7c0 0-.1 .1 0 .1c-.1 0-.2 0-.2 .1c0 0-.1 .1-.1 .1c0 0-.1 0-.1 .1c0 0-.1 0-.1 .1c-.1 .1-.1 .2-.2 .2c-.1 .1-.2 .2-.3 .2c0 0-.1 0-.1 0c0 .1-.1 .1-.1 .2c0-.1 0-.2 0-.1q-.1 0 0 .1q0 .1-.1 .1v-.1c0 0 0-.1 0-.1c0 0 0 .1 0 .1q-.1 0-.1 0q0 .1 0 .1c0 0 .1 0 .1 0c0 0 0 .1-.1 .1V45q0 .1-.1 .1c0 0-.1 0-.1 0h.1q-.1 0-.1 0q0 .1-.1 .2c0 0 0 .1-.1 0v.1c0 0 .1 0 .1-.1c0 0 .1 0 .1 0l-.4 .4v-.1q-.1 .1-.2 .1v.1q.1 0 0 0c-.1 .1-.2 .1-.2 .2v-.1l-.1 .1q0 .1 0 .2ZM707.3 53c0 .1-.1 .1-.1 .1q0 .1 0 .2c0 0 .1 .1 .1 .1c0 0 0-.1 0-.2c0 0 0-.1 0-.2Zm0-1.4q0 .1 0 .2c0 .1-.1 .1-.1 .2q0-.1 0-.2c0-.1 .1-.1 .1-.2Zm-.1-.5V51q.1 0 .1-.1q-.1 .1-.1 .2Zm0-.7c0 0 .1 0 .1 0v-.1q0 .1 0 .1q-.1 0-.1 0Zm.1 .8v.1q-.1 0-.1 0h.1c0 0 0-.1 0-.1Zm-.1 1.8h.1c0 0-.1 0-.1 0ZM707.4 51.9c0 0 0-.1 0-.1v-.1v.1ZM707.5 51.5q-.1 0-.1 0v.1q0-.1 .1-.1Zm-.1-1.4q.1 .1 0 .1c0 0 0 .1 0 .1q.1-.1 .1-.1c0 0 0-.1-.1-.1Zm0-1.6l.1-.1q0 .1 0 .1q-.1 0-.1 0Zm.1 4.9v-.1q-.1 0 0 0c0 0 0 .1 0 .1Zm0 0c0 0 0 .1 0 .2c0 0 0-.1 0-.2Zm0-3.5c0 0 0 .1 0 .1c.1 0 .1-.1 .1-.1l.1-.3Zm.2-1.8q-.1 0-.1 0Zm-.1 2.9v.1V51Zm.1-1c0-.1 0-.2 0-.3q0 .1 0 .1q0 .1 0 .2Zm0-.1V50c0 0 0-.1 .1-.1h-.1Zm.2-.3c0 0-.1 0-.1 0q0 .1-.1 .1v.1h.1q0-.1 0-.1c0-.1 .1-.1 .1-.1ZM707.9 50c0 0 0-.1 0-.1V50Zm.1-.2q-.1 0-.1 .1c0 0 0-.1 .1-.2v-.1Zm0-.4h-.1Zm0-.7c0-.1 .1-.1 .1-.1q.1-.1 .1-.1c-.1 0-.2 .1-.2 .2ZM708.4 49c-.1 0-.1 .1-.1 .1V49c.1-.1 .2-.1 .2-.2q0-.1 .1-.2c0 .1-.1 .1-.1 .2c0 0 0 .1 0 .2q-.1 0-.1 0Zm-.1-1.8c0 0 .1-.1 .1-.1h-.1c0 0 0 .1 0 .1Zm0 1.3c.1 0 .1-.1 .1-.1c0 0-.1 .1-.1 .1Zm.1 .6V49Zm.1-.9c0-.1 .1-.2 .1-.2c.1-.1 .2-.2 .2-.3l-.3 .4Zm.1-1.5c0-.1 .1-.2 .2-.2ZM708.7 47.7c0-.1 .1-.1 .1-.1c.1 0 .1-.1 .1-.1Zm.3 .5c-.1 0-.1 .1-.1 .1q0 .1-.1 .1c.1 0 .1-.1 .1-.1q0-.1 .1-.1Zm0-1.9q.1 0 0 0Zm0 1.1q.1-.1 .1-.2q.1-.1 .1-.1q-.1 0-.1 .1c0 .1-.1 .1-.1 .2Zm.3-.3c-.1 .2-.2 .3-.3 .4Zm-.2 .8c0 0 0 .1 0 .1v-.1Zm.3-2.1c0 .1-.1 .2-.1 .2c-.1 .1-.2 .1-.2 .2c0-.1 .1-.1 .1-.2c.1 0 .1-.1 .2-.2Zm-.3 1.8q.1 0 .1-.1v.1Zm.2 .1q-.1 .1-.1 .1v-.1h.1Zm0 0c0 0 0-.1 0-.1c0 0 .1 0 .1 0c0 0-.1 .1-.1 .1Zm0-.6c.1 0 .1-.1 .2-.1c0 0 0-.1 .1-.1q-.1 0-.2 .1c0 0-.1 .1-.1 .1Zm.8-.8c0 .1-.1 .1-.1 .2q-.1 0-.2 .1q-.1 .1-.1 .2c-.1 .1-.1 .2-.2 .2v.1l.2-.2l.6-.7q-.1 0-.1 .1q-.1 0-.1 0Zm-.5 .5q0-.1 0-.1c0 0-.1 0 0 .1Zm.1-.3c0 0-.1 .1-.1 .1v.1q0-.1 .1-.1c0 0 0-.1 0-.1Zm0 .2v-.2v.1Zm.1 .5l-.1 .1c0 0 0-.1 .1-.1Zm.1-.8c0 0 0-.1 .1-.1v-.1v.1Zm.2-.4q0 .1 0 .1Zm0-.1q0 .1 0 .1v-.1Zm0 .4c0 0 0-.1 0-.1v-.1c0 0 0 .1 0 .2Zm.1-.3q0 .1 0 .1c0-.1 .1-.2 .1-.1c0-.1 .1-.1 .1-.1c0 0 0-.1 0-.1c.1 0 .2-.1 .2-.1q0-.1 0 0q0-.1 .1-.2c.1 0 0 0 0 0Zm0 .7v.1q0-.1 0-.1Zm.4-.5c0 .1-.1 .1-.2 .2v-.1q.1 0 .1 0q.1-.1 .1-.1Zm0-.7q-.1 0-.2 .1q0 .1 0 0Zm-.1 .6q-.1 0 0 0Zm0 .4q0-.1 0-.1c0-.1 .1-.1 .1-.1v.1q-.1 0-.1 .1Zm.2-.2q-.1 .1-.1 .1q0-.1 .1-.1Zm0-.4l-.1 .1v-.1Zm.2-.5q-.1 0 0 0c0 0 0-.1 0-.1c0 0 .1-.1 .1-.1l-.3 .3c0 0 .1-.1 .2-.1Zm-.2 .3h.1h-.1Zm.3-.8q.1 .1 0 .1q-.1 .1-.1 .1c0 .1-.1 .1-.1 .1c0 0 0 .1 0 .1l.3-.3h.1l-.1 .1q.1 0 .1-.1v-.1c0 0 0-.1 0-.1q0 .1 0 .2Zm.2 9.2c-.1 0-.2 .1-.2 .2c-.1 0-.1 .1-.2 .2Zm0-8.9q.1 0 .1 .1q-.1 0-.1 0c0 0 0-.1 0-.1Zm.2-.1l-.1 .1v-.1Zm.2-.6c-.1 0-.1 .1-.2 .1c.1 0 0 0 0 .1c.1 0 .1-.1 .2-.1c0 0 0-.1 0-.1Zm0 .8c0 .1-.1 .1-.1 .1Zm0-.9c0 0 .1 0 .2 0c-.1 0 0-.1 .1-.1q.1-.1 .1-.2c0 0 0-.1 0-.1c0 0 0 .1 0 .1v.1l.3-.2v-.2q.1 0 .1-.1q.1 0 .1 0q.1-.1 .2-.2c.1 0 .1-.1 .2-.1c-.1 0-.2 0-.3 .1q-.1 .1-.2 .2c.1-.1 .2-.2 .3-.3c.1 0 .1-.1 .2-.2c-.2 .2-.4 .4-.6 .5c-.2 .2-.4 .3-.5 .5q0 .1-.1 .1c0 0 0 .1-.1 .1Zm.1 9.4h.1Zm0-9.1c0-.1 .1-.1 .1-.1c0-.1 .1-.1 .1-.2c-.1 .1-.2 .2-.2 .3Zm.2-.6q0 .1 0 .1h-.1c0 0 0-.1 .1-.1Zm0 9.3c.1 0 .1 .1 .1 .1q-.1 .1-.1 .1v-.1c0 0 0-.1 0-.1Zm.1-5.8q-.1 0-.1 0c0 0 .1 0 .1 0Zm.2 5.4c0 .1 0 .2-.1 .2c0 0 0-.1 .1-.2Zm-.1-6.1q0-.1 .1-.1h-.1Zm.1 6v-.1ZM712.3 52.8c0 0 0 .1 0 .1Zm0-8.9c.1-.1 .2-.1 .3-.2c-.2 .1-.3 .2-.3 .2Zm.1 8.7l-.1 .1c0 0 .1 0 .1 0q0-.1 0-.1Zm0-.3c.1 .1 0 .2 0 .3q0-.1 0-.2v-.1Zm.2 0c0 .1-.1 .1-.1 .2c0 0 0 .1-.1 .1c0-.1 .1-.2 .2-.3Zm-.1-8.4c.1-.1 .2-.1 .2-.1c.1 0 .1-.1 .1-.1Zm.1-.2c.1 0 .1-.1 .1-.1q-.1 0-.1 .1Zm0-2.3h.2Zm.3 10.2c0 .1 0 .2-.1 .3c0 .1-.1 .2-.2 .3Zm-.1-10.2c0-.1 .1-.2 .1-.2Zm.3-.3H713v.1Zm0-.1v.1Zm.3 9q.1 0 0 0c0 0 0 .1 0 .1q0-.1 0-.1Zm.6-1.5c-.1 0-.1 .1-.1 .2c0 0 0-.1 0-.1c0 0 0-.1 .1-.1Zm1.8-11.6q-.1 0-.1 0c0 0 0-.1 .1-.1Zm0 .1v-.1Zm.4 5q.1 .1 0 .1V42Zm.8-.8c0 0 0 .1-.1 .1c.1-.1 .2-.1 .1-.1Zm.4-.2q.1 0 0 0c0 .1-.1 .1-.1 .1c0 .1-.1 .1-.1 .1q0-.1 .1-.1c0-.1 .1-.1 .1-.1Zm.3-.1c0 .1-.1 .1-.1 .1q-.1 0-.2 .1c.2-.1 .3-.2 .3-.2Zm.7-.3c-.1 0-.2 0-.4 .2c-.1 .1-.2 .1-.3 .1c0 0 .1-.1 .3-.2c.2-.1 .3-.1 .4-.1Zm.2-1.1q-.1 0-.1-.1c0 0 .1 .1 .1 .1Zm.1 1.2h-.1Zm.3-.2q0 .1-.1 .1c0 0 0 .1-.1 .1q.1-.1 .2-.2Zm-.1-.5l.1 .1V40ZM719.8 39.9c0 0-.1 0-.1 0q0 .1-.1 .1q.1-.1 .2-.1ZM719.8 39.9q0-.1 .1-.1c0 0 0 .1-.1 .1Zm.2-.1v.1c0 0-.1-.1-.1-.1Zm0 .1c0 0 0-.1 .1-.2c0 0 0 .1 0 .1c0 0 0 .1-.1 .1Zm.3-.4h-.1c0 0 0 .1 0 .1c0 0 0-.1 0-.1h.1Zm0-.3h-.1h.1Zm.2 .1q-.1 0-.1 0v-.1c0 0 0 .1 .1 .1Zm0-.1c0 0 0 .1 0 .1q0-.1 0-.1Z' class='g0'/%3E%0A%3Cpath d='M721.8 46.4c-.1 0 0-.1 .1-.2l-.3 .2v.1q-.1 .1-.2 .2c0 0-.1 0-.2 0c-.2 .1-.4 .1-.7 .1c-.3 .1-.5 .1-.6 .1c-.1 0-.3 0-.5-.1c-.2-.2-.3-.2-.4-.3c-.3-.1-.6-.4-.7-.7c-.2-.3-.3-.6-.3-.9c0-.8 0-1.5 .1-2.1c0-.7 .1-1.4 .2-2.1l.4-1.9c.1-.4 .2-.9 .4-1.5c.1-.6 .2-1.2 .4-1.7c.1-.6 .3-1.2 .4-1.7c.1-.6 .3-1 .4-1.4c.2-.4 .3-.9 .5-1.5l.1-.4c.1-.1 .1-.2 .1-.2c.1-.1 .1-.2 .2-.4c0 0 0-.2 0-.4c.2-.2 .3-.3 .4-.4c.1-.2 .2-.4 .2-.6l.3-.3c0-.1 0-.2 .1-.2c0 0 .1-.1 .3-.1c.1-.1 .2-.1 .3-.1h.1c.1 0 .3 0 .4 0c.1 0 .2 0 .3 0c.1 0 .1 .1 .2 .1c.1 0 .3 .1 .4 .3c.1 .2 .1 .3 .2 .4c.1 .1 .1 .2 .2 .3c0 .2 .1 .3 .2 .5c0 .2 .1 .5 .1 .8c.1 .1 .1 .2 .1 .4c0 .2 .1 .4 .1 .6c0 .1 0 .3 0 .5c0 .2 .1 .4 .1 .5c0 .8-.1 1.5-.4 2.2c-.2 .8-.6 1.4-1 2c-.1 .2-.2 .4-.4 .5c-.1 .2-.2 .2-.2 .2c0 .1 0 .2-.2 .3c-.2 .2-.4 .4-.6 .6c-.2 .3-.4 .5-.7 .8c-.2 .2-.4 .5-.5 .7l-.4 1v.1q0 .1 0 .1l-.1-.1v.4h-.1l-.1 1q-.1 0-.1 .1c0 0 0 .1 0 .1l-.1 .2q0-.1 0-.1c0 0-.1 .1-.1 .1q0 .1 0 .2c0 0 0 .1 0 .2c0 0 .1 .1 .1 .1c0 .1-.1 .2-.1 .3c0 0 0 .1 0 .2q0-.1 .1-.1v.2h-.1c0 0 0 .1 0 .1c-.1 0-.1 .1-.1 .1c0 0 0 .1 0 .1q0-.1 0-.2q0-.1 0-.2q.1 0 .1 0q-.1 0-.1-.1l.1-.4c0 0-.1 0-.1 0q-.1 .1-.1 .1q0 .1 0 0q.1 0 .1 0q-.1 .1-.1 .1c.1 0 0 0 0 .1c0 0 0 .2 0 .4c0 .1 0 .3 0 .5c.1 .2 .1 .4 .2 .6c0 .1 .1 .3 .2 .4c.2 .1 .4 .1 .8-.1c.3-.2 .7-.6 1.1-1c.5-.4 1-1 1.5-1.6c.5-.5 .9-1.2 1.4-1.8c.5-.6 .9-1.2 1.3-1.7c.4-.5 .7-1 .9-1.3q0-.1 0-.1l.1-.1c.1-.1 .2-.2 .3-.4c.1-.1 .2-.3 .3-.5q.1 0 .1 0q0 .1 0 .2l.1 .1l.1-.3q0 .1 0 .2c-.1 0-.1 .1-.1 .2c.1-.1 .2-.2 .2-.4c.1-.1 .2-.2 .3-.4q0 .1 .1 0c0-.1 .1-.1 .1-.2c0 .2 0 .3-.1 .3q0 .1 0 .2q0 .1 0 .1h.1c-.1 .2-.2 .3-.2 .4l-.3 .1c0 .1 0 .2 .1 .2c0 .1-.1 .1-.1 .2c-.1 0-.1 .1-.2 .2c.1 0 0 0 0 .1c0 .1-.1 .2-.1 .3c-.1 .1-.1 .2-.2 .3c0 .1 0 .2 0 .2c-.1 .1-.2 .2-.4 .2c0 0-.1 .1-.1 .2c-.1 .2-.2 .3-.2 .3l-.4 .9c.1-.1 .2-.2 .3-.5c0 0 .1-.1 .1-.2c.1-.1 .2-.2 .3-.3c-.2 .4-.4 .7-.6 1c-.2 .2-.4 .5-.6 .8q0 .1 0 .1c0-.1 .1-.2 .2-.2c0 0-.1 .1-.1 .1c-.1 .1-.1 .2-.2 .2v.1c0 0 0 .1-.1 .2v-.1c-.2 .2-.4 .4-.7 .7c-.2 .3-.5 .6-.7 1c-.3 .3-.5 .6-.8 .9c-.2 .3-.4 .5-.5 .7l.1-.1c0 0 .1 0 .2-.1c-.3 .4-.6 .6-.8 .9c-.2 .2-.5 .4-.8 .7c0 0-.1 0-.1 0c-.1 0-.1 .1-.2 .1c.1 0 .2-.1 .3-.1c0 0-.1 0-.1 .1l.1-.1c-.1 .1-.2 .2-.4 .3v-.1Zm-1.6-4c0 0-.1-.1-.1-.1c0 0 0-.1 0-.1c0 0 0-.1 0-.1q.1 0 .1 0c-.1-.1-.1-.2-.1-.2q.1-.1 .1-.2c-.1 .1-.2 .3-.2 .4c0 .2 0 .3 0 .4Zm-.1 .6c0 0 0-.1 0-.2c0-.1 0-.2 0-.3c-.1 .1-.1 .3 0 .5Zm.1 1.5q0-.1-.1-.1l.1-.1c0 0 .1 .1 0 .2Zm0-.4c0 0 0-.1-.1-.1c0 0 0-.1 .1-.1c0 0 0 .1 0 .1q0 .1 0 .1Zm0-2.8q0 .1 0 .2q0 .1 0 .2c0-.2 0-.3 0-.4Zm.2 3.6V45c-.1 0-.1-.1-.1-.1c0 0 0-.1 0-.1q0-.1 0-.1q0 .1 0 .1c0-.1 0-.2 0-.3c-.1-.1-.1-.2 0-.3Zm-.2-1.5c0 0 .1 0 .1 0v-.1v.1h-.1Zm.1 .4q0 .1 0 .2c0 0-.1 0-.1-.1c0-.1 .1-.1 .1-.1Zm.1-.9c0 .2 0 .3 0 .4c-.1 .2-.1 .3-.1 .5v-.5c0-.1 0-.2 0-.3c0-.1 0-.3 0-.3v-.2h.1Zm.2 1.4c-.1 0-.1-.1 0-.1c0-.1 0-.2 0-.2c.1 0 .1 .1 .1 .1q-.1 .1-.1 .2ZM720.6 41.8q.1 0 0 .1c0 0 0-.1 0-.1Zm0 2q.1 0 0 0c0 0 0 .1 0 .1c0 0 0-.1 0-.1Zm0-1.4c0 0 0-.1 0-.1q0 .1 0 .1Zm0 1.9v.2c0 0 0-.1 0-.2Zm0-2.3q.1 0 .1 0c0 0 0 .1-.1 .1c0 0 0-.1 0-.1q.1 0 0 0Zm0 1.2c0 0 0 .1 0 .1Zm.1-1.5q0-.1 0-.1v.1Zm0-.2q0-.1 0-.1v.1Zm.5-2.4v.1v-.1Zm1.9-3c.1-.1 .2-.4 .3-.8c.2-.4 .3-.8 .5-1.2c.1-.5 .2-.8 .3-1.2c.1-.3 .2-.5 .2-.6c-.1-.1-.1-.3 0-.3c0-.1 0-.2 0-.3c0-.5-.1-.9-.2-1.2c-.1-.2-.2-.3-.3-.3c-.1 0-.2 0-.3 .1c0 .2-.1 .3-.2 .5c0 .2-.1 .3-.1 .5c0 0-.1 .1-.1 .1v.1c0 0 0 .1 0 .3c-.1 .2-.2 .5-.2 .8c-.1 .3-.2 .6-.3 .9c0 .3-.1 .6-.2 .9c-.1 .4-.1 .7-.2 1c-.1 0-.1 .2-.2 .3c0 .1-.1 .2 0 .3c-.1 .3-.2 .7-.3 1.1c-.1 .4-.2 .7-.3 1.1c.3-.4 .6-.8 .9-1.1c.2-.4 .5-.7 .7-1Zm-.9 10c0-.1 .1-.1 .1-.1c0 0 0 .1-.1 .1Zm4.7-5.6v.2q0-.1 0-.1q0-.1 0-.1Zm.2-.2c0 0 0 .1-.1 .1ZM727.4 39.2q.1 0 0 0Zm.2-.4q.1 .1 .1 .2c-.1 0-.1 .1-.1 .1c0-.1 0-.2 0-.2v-.1Zm.1 .3l.1-.1c0 0 0 .1-.1 .1Zm.6-2.6q0 .1-.1 .1Z' class='g0'/%3E%0A%3Cpath d='M730.9 52.1c-.1 .2-.3 .4-.4 .6c.1-.1 .1-.2 .2-.3c0 0 0-.1 .1-.2h-.1v.1l-.1 .1q-.1 0-.1 0q.1 0 .1 0c-.1 0-.2 .1-.2 .2c-.1 .1-.2 .2-.2 .2q-.1 0 0-.1h.1c-.2 0-.2 .1-.2 .1c-.1 .1-.2 .2-.3 .3c0 .1-.1 .2-.2 .3h.1l-.6 .5c0 0-.1 0-.1 0c0 0 .1-.1 .1-.1l-.2 .1l.2-.1c0 0-.1 0-.1 0q-.1 .1-.1 .1c0 0-.1 .1-.1 .1c0 0 0 .1 0 .1q-.1-.1-.1 0c0 0-.1 .1-.1 0q0 .1 0 .1h.1c-.1 0-.1 .1-.2 .1c-.1 .1-.2 .1-.3 0c0 0 0 .1 0 .1h-.1c0 .1-.1 .1-.1 .2c-.1 0-.2 .1-.3 .1c-.1 0-.2 .1-.2 .1l-1.1 .3l-.1 .2c-.1 0-.1-.1-.1-.1v-.1c0 .1-.1 .1-.2 0c0 0-.1 0-.1 .1c-.1 0-.3 0-.4 0c-.1-.1-.3-.1-.4-.1H725c-.2 0-.3-.1-.5-.1c-.1-.1-.2-.1-.3-.2q-.1-.1-.2-.2c-.1 0-.2-.1-.2-.2c0 0 0 .1 0 .1v.1q0-.1-.1-.1q0-.1 0-.2c-.1-.2-.2-.3-.2-.5c-.1-.2-.1-.3-.2-.5h.1c0-.1 .1-.1 0-.1v-.1c.1 0 .1 .1 .1 .2c0-.5 0-1.1 .2-1.6c.1-.6 .3-1.1 .5-1.5v.1c-.1 .2-.2 .5-.3 .8c0 .3-.1 .6-.2 .9c0 .1 0 .2 0 .4c-.1 .1-.1 .2-.1 .3c.1-.4 .2-.8 .3-1.2c.1-.5 .2-.9 .4-1.2c.2-.6 .4-1.1 .7-1.6c.3-.4 .5-.9 .8-1.4l.5-.7c.1-.1 .2-.3 .3-.4c.1-.1 .2-.2 .3-.3c.1-.1 .2-.2 .3-.3c.1-.2 .3-.3 .4-.3c.2-.3 .4-.5 .6-.7c.2-.2 .4-.4 .6-.6c.1-.1 .2-.2 .3-.3c.1-.1 .2-.2 .3-.3l.9-.8l1.2-.8c0-.3 .1-.5 .1-.6c0-.1 0-.2 0-.3c0-.1 0-.2 .1-.3c0-.1 0-.3 .1-.5q-.1 0-.1 0c.1 0 .1-.1 .1-.3c-.1 .1-.1 .2-.2 .2q-.1 .1-.1 .3l-.3 .2l-.4 .5c.1 0 .2-.1 .3-.2c0-.1 0-.2 .1-.2c0 0 .1-.1 .2-.1c.1 0 .1-.1 .2-.1c-.1 .1-.3 .3-.5 .5c-.1 .1-.3 .3-.4 .4c-.1 .1-.2 .1-.3 .2c-.1 .1-.1 .2-.2 .3L730 42q0 .1 0 .2h-.1c.1 0 0 0 0 .1c-.1 0-.1-.1-.1-.1q-.1 .1-.1 .2c-.1 0-.1 .1-.2 .1c.1 0 0 .1 0 .1q-.1 0-.1 .1c0-.1 .1-.1 .1 0c-.1 0-.2 0-.3 .1c-.1 0-.2 0-.2 .1c-.2 0-.3 .1-.3 .1c0 0-.1 .1-.3 .1c-.1 0-.2 0-.3 0c-.1 0-.2 0-.2 0q-.1 0-.1 .1c-.5-.1-.8-.2-1-.4c-.2 0-.3-.1-.4-.1c-.1-.1-.2-.2-.3-.3c-.2-.2-.2-.5-.2-.7c0-.3 0-.5 0-.8c.2-.8 .3-1.6 .6-2.3c.2-.7 .5-1.4 .7-2.1h.1c.1-.3 .2-.7 .3-1c.1-.3 .2-.7 .2-1c.2-.1 .3-.3 .4-.4c.2-.2 .4-.2 .6-.2q.1 0 .1 0q0-.1 0-.1q.1 .1 .1 .1c.1 0 .2 0 .2 0c0 .1 .1 .1 .2 .1c0 .1 .1 .1 .2 .2q.1 0 .2 .1c.2 .1 .3 .3 .4 .4c.2 .2 .3 .3 .3 .5c0 .2 0 .4-.1 .5c0 .1-.1 .3-.2 .4c0 .1 0 .2-.1 .3c0 .1 0 .2-.1 .3c-.1 .2-.1 .4-.2 .6c-.1 .2-.2 .3-.2 .5l-.3 .9c-.1 .5-.3 .9-.4 1.2c-.2 .4-.3 .8-.4 1.3c-.1 .1-.1 .2-.1 .3c-.1 .2-.1 .3 0 .3q0 .1 .1 .1c.2-.1 .4-.2 .6-.4c.2-.2 .4-.4 .5-.6c.2-.2 .4-.4 .6-.6c.2-.2 .3-.4 .4-.5c.2-.2 .3-.4 .5-.5l.4-.6h.1c.1-.2 .2-.4 .3-.7c.2-.2 .3-.4 .4-.6c.1-.1 .2-.2 .2-.3c0-.1 0-.2 .1-.4l.3-1.2c0 0 0-.1 0-.1c0 0-.1 0-.1 0c.1 0 .1-.1 .2-.1c0-.1 0-.2 0-.2q.1-.1 .1-.1h.2l.3-.4c0 .1 .1 .1 .1 0c.2 0 .4 .1 .5 .1q.1 .1 .2 .1c0 .1 .1 .1 .1 .2c.1 0 .2 0 .3 0v.1c.1 0 .2 .1 .2 .1c.1 0 .1 .1 .2 .1q0 .1 0 .2q0 .1 .1 .2c0 0 0 .1 0 .2c0 .1-.1 .2-.1 .4c-.1 .1-.1 .2-.1 .4c-.1 .2-.1 .4-.2 .5c0 .2-.1 .3-.1 .5c-.1 .3-.2 .6-.2 .8c-.1 .2-.1 .4-.2 .6c0 .2-.1 .5-.1 .7c-.1 .2-.1 .5-.1 .8c0 0 .1 0 .1 0c.3-.1 .7-.2 1.1-.5c.5-.2 1-.4 1.5-.6c.6-.3 1.1-.5 1.6-.7c.5-.2 .9-.3 1.2-.4c-.1 0-.1 .1-.1 .1q.1 0 .1 0c0 0 0 .1 0 .2v-.1c0 .1 .1 .1 .1 .1c0 0 .1 0 .1 0c0 0 .1 0 .2 0q-.1 0-.2 0c-.1 0-.1 .1-.2 .1q.1 0 .2 0c0 0 .1-.1 .2-.1c-.1 .1-.2 .1-.3 .1c-.1 0-.1 .1-.2 .1h.1c-.1 .1-.2 .2-.3 .2c-.1 0-.2 .1-.3 .1h.1c0 0-.1 .1-.1 .1H739l-.2 .1c.1 0 .2 0 .3-.1c0 0 .1 0 .1 0c.1-.1 .2-.1 .2-.2c.1 0 .2 0 .3 0c-.1 0-.1 .1-.2 .1c-.1 .1-.2 .1-.2 .1c0 0 .1 0 .2 0c0 0-.1 0-.1 .1q-.1 0-.2 0c0 0-.1 .1-.2 .1c-.1 .1-.2 .1-.3 .1l.1-.1l-.1 .1c-.1 0-.3 .1-.6 .3c-.3 .2-.7 .4-1.1 .6c-.4 .2-.8 .4-1.1 .6c-.4 .2-.6 .3-.7 .4c-.1 0-.2 0-.3 .1c0 .1-.1 .1-.2 .2c0 0 .1 0 .1 0c0 0 .1 0 .2 0q-.1 0-.2 0q-.1 0-.1 .1c-.1 .1-.2 .1-.4 .2c-.1 0-.2 .1-.3 .2l-.1 .1c-.1 .6-.2 1-.3 1.5c0 .4-.1 .9-.2 1.5c-.1 .9-.3 1.7-.5 2.5c-.2 .7-.5 1.5-.8 2.2c.1-.3 .2-.6 .3-.9c.2-.3 .3-.7 .3-1c-.2 .5-.4 1-.5 1.4c-.2 .5-.4 1-.6 1.4v.1l-.1-.1c-.1 .1-.1 .3-.2 .4c-.1 .2-.2 .3-.2 .5V52q-.1 0-.1 0l-.1 .2Zm-7.6 .7c.1 0 .1 .1 .1 .1q-.1 0-.1-.1Zm.2 .6q0 .1 0 .2c0 .1 0 .2 .1 .3q0-.1 0-.2c-.1 0-.1-.1-.1-.2v-.2Zm.5 1.3q0 .1 0 0c0 0-.1 0-.1-.1ZM724.4 49.6c0 .1 0 .2-.1 .2q0 .1 0 .1c0 0 0-.1 .1-.3Zm.4-.8c0 .1-.1 .3-.1 .4c-.1 .2-.2 .3-.3 .4Zm.1-.2l.1-.1Zm2.1-.5c0 .1-.1 .2-.2 .3c0 .1-.1 .2-.1 .3q0-.1 .1-.2l-.1 .1l-.2 .3c0 0-.1 0-.1 0q0 .1 0 .1l-.1 .1v.2v-.1l-.2 .3l.1-.1l.4-.8h-.2l.1 .1q0-.1 0-.1q0 .1 0 .1c0 .1-.1 .1-.1 .1q0-.1 0-.1c0 0 0-.1 .1-.1q0-.1 0-.2c0 0 .1-.1 .1-.2c.1 0 .1-.1 .2-.1c.1-.3 .3-.6 .5-.9c.2-.3 .4-.5 .6-.8q.1 0 .1 0q.1-.1 .2-.2c0-.1 .1-.1 .1-.2l.1-.1V46q0-.1 0-.1c0 0 .1 0 .1-.1c0-.1 .1-.1 .1-.2q.1 0 .2 0c0 0 0-.1 0-.1c0-.1 .1-.1 .1-.2q0 .1 0 .1c0 0 0 .1 0 .1c0 .1-.1 .1-.1 .2c-.1 0-.2 0-.2 .1l-.2 .3c.2-.2 .3-.4 .5-.6c.1-.1 .3-.3 .5-.5c-.1 .1-.2 .1-.2 .2c0 0-.1 .1-.2 .1c0 0 .1 0 .1-.1q0-.1 .1-.1q.1-.1 .1-.1c.1-.2 .3-.3 .4-.4c.2-.1 .3-.3 .4-.4q.1-.1 .1-.1c0 0 .1 0 .1 0q0-.1 0-.1q.1-.1 .2-.1c0-.1 .1-.1 .2-.2c0 0 .1-.1 .1-.2h.1c0 0 .1-.1 .2-.1q.1-.1 .1-.2q0-.1 0-.1c0 0-.1 0-.1 0q.1-.1 .1-.2c-.1 .1-.2 .2-.3 .3c-.1 .1-.2 .2-.3 .2q0 .1 0 .1c0-.1 0 0 0 0h-.1q0 .1 0 .1c0 0 .1 0 .1-.1c0 0 .1 0 .1-.1c0 .1 .1 .1 .1 0q-.1 .1-.2 .2q0 .1-.1 0c-.1 .1-.2 .2-.2 .3q-.1 .1-.2 .2H730l-.9 .9c0 .1-.1 .1-.1 .1c-.3 .3-.5 .6-.7 .8c-.3 .3-.5 .6-.7 .8h-.1l-.2 .4l-.3 .3c0 .1 0 .2-.1 .3c0 0-.1 .1-.1 .2c0-.1 0-.2 .1-.2c0-.1 .1-.2 .1-.3c-.2 .3-.3 .5-.5 .8c-.1 .2-.3 .4-.4 .7c-.1 .1-.1 .2-.2 .2c0 .1-.1 .2-.1 .3l.3-.4c-.1 .2-.2 .4-.3 .6c-.1 .1-.2 .3-.3 .4c0 .2-.1 .4-.2 .6c0 .2-.1 .4-.1 .6v.2q-.1 .1-.1 .1c0 .1 .1 .1 .1 .2h-.1v.1c0 .2 0 .4-.1 .7c-.1 .2 0 .4 .1 .6c0-.1 0-.2 0-.3q0-.1 0-.2c0-.1 0-.2 .1-.2v.1c0 .1 0 .2 0 .3c0 .1 0 .3 0 .3c0-.1 .1-.1 .1-.1c0 .1 0 .2 0 .3c0 .1 .1 .2 .1 .3c0 0 .1 .1 .1 .2c0 .1 .1 .1 .1 .2c.1 .1 .1 0 .1 0c0 .1 .1 .1 .1 .1c.1 0 .2 .1 .4 .1q0-.1 0-.1V54c0 .1 .1 .1 .1 .1c0-.1 0 0 0 0c.4-.1 .7-.3 1-.5c.2-.2 .4-.4 .7-.7v-.1c0 0 0 .1 0 .1h.1q0-.1-.1-.1c0 0 .1 0 .1 0c.1-.2 .2-.3 .2-.4c.1-.1 .2-.2 .3-.4c.2-.2 .3-.5 .5-.7c.1-.3 .2-.6 .4-.9c0-.1 0-.2 .1-.2q0-.1 0-.2c0 0 .1-.1 .1-.2c0-.1 .1-.2 .1-.3c0 0 0-.1 0-.1c0 0 .1-.1 .1-.1l.1-.1c0 0 0-.1 0-.1q0-.1 .1-.2q-.1 0 0 0v-.1c0-.1 .1-.3 .1-.4c0-.2 .1-.3 .2-.4c-.1-.1 0-.2 0-.3q.1-.1 .1-.2c0-.1 .1-.2 .1-.4c0-.1 .1-.2 0-.3q0-.1 0-.1q0-.1 .1-.2c0 0 0-.1 0-.1q0-.1 0-.2c0 0 0-.1 .1-.1c0 0 0-.1 0-.1c0-.2 .1-.4 .1-.6c0-.2 0-.4 0-.6c.1-.1 .1-.2 .1-.2c.1-.2 .1-.4 .1-.6c.1-.2 .1-.4 0-.5q0 .1-.1 .2v-.1c-.2 .2-.3 .4-.5 .5c-.3 .1-.4 .3-.6 .5c0 0-.1 0-.1 0c0 0 0 .1 0 .1l-.5 .6h-.1c-.1 0-.1 .1-.1 .1c.1 0 .1 .1 0 .1v-.1q0 .1 0 .1q-.1 0-.1 .1l-.2 .1l-.2 .3q-.1 .1-.1 .1c0 0 .1 0 .1 0h-.1v.1v-.1q-.1 .2-.2 .2c0 0 .1 0 0 0c-.1 0-.1 .1-.2 .2c-.1 .1-.1 .2-.2 .4l-.1 .2q-.1-.1-.1-.1c.1 0 0 0 0 0v.1l-.1 .1q-.1 .1-.1 .2c-.1 0-.2 .1-.2 .2c-.1 0-.1 .1-.2 .1c.1 0 .1-.1 .1-.1c-.1 .1-.2 .2-.3 .3c-.1 .2-.1 .3-.2 .5c0 0-.1 0-.1 0q0 .1 0 .1v.1l.2-.2c0-.1 .1-.2 .2-.3Zm-2 4.6q.1 .1 .1 .1H725v-.1Zm.1-.1c-.1 0-.1-.1-.1-.1q.1 0 .1 0Zm.1-.9c0 .1 0 .2 0 .3c0 0 0 .1 0 .3h-.1q0-.1 0-.1c0 0 .1 0 .1 0c0 0 0-.1 0-.1q-.1 0-.1-.1c0-.1 .1-.2 .1-.3Zm0-.2v.1c0 0 0-.1 0-.1Zm0 .4c0 0 0 .1 0 .1c0 .1 0 .2 0 .3c0-.2 0-.3 0-.4Zm.1-.1q-.1-.1-.1-.1c0 0 .1 .1 .1 .1Zm-.1 .6q.1 0 .1 .1c0 0 0 .1-.1 .1Zm.1-1.3c0 .1 0 .2 0 .2c0 .1 0 .2 0 .3c0-.2 0-.4 0-.7c.1-.2 .1-.4 .2-.6c0-.1 .1-.1 .1-.1c0 0 0-.1 0-.1Zm.1 .3c0 .2-.1 .4-.1 .6c0-.3 0-.5 .1-.6Zm-.1 .3v-.1Zm.1-1.2c0 0 0 .1 0 .1c0 .1 0 .2-.1 .2c0 0 0-.1 .1-.2c0 0 0-.1 0-.1Zm0 .8q0-.1 0-.1c0-.1 .1-.1 .1-.2Zm.1-.3q-.1 0 0 0q0-.1 0 0Zm.1-.4h.1l-.1 .2c-.1 0-.1-.1-.1-.1c0 0 0-.1 0-.1c0 0 .1 0 .1 0Zm-.1 .2c0 0 .1 0 .1 0l-.1 .1v-.1Zm.1-.9c0 0 .1-.1 .1-.1c-.1 0-.1 .1-.1 .1Zm.1 .6v.1v-.1ZM725.8 49.8h-.1c0 0 .1 0 .1 0Zm0 .5q0-.1 0 0Zm.1-.4h-.1Zm0 .5v-.1Zm.1-1.7c0 0 .1 0 0 0c0-.1 .1-.1 .1-.1q-.1 0-.1 .1Zm0 .9l.1-.1Zm.2-.4l-.1 .1c0-.1 .1-.2 .1-.2c0-.1 .1-.2 .1-.2c0-.1 .1-.1 .1-.1c0 .1 0 .2-.1 .3c-.1 .1-.1 .2-.1 .3Zm0-.4c0 0 0 .1 0 .1q-.1 0 0-.1Zm0 .1V49q0-.1 0-.1Zm.2-.5q0 .1 0 .1c-.1 0-.1 .1 0 .1q-.1 0-.1 0q0 .1-.1 .1c0 0 0-.1 .1-.1q0-.1 .1-.2Zm-.2 .5c.1 0 .1-.1 .1-.1c0 0 0 .1 0 .1c0 0-.1 0-.1 0ZM726.5 48.9l-.1 .1l.1-.1Zm.3 6c-.1 0-.2 0-.2 0c0 0-.1 0-.1 .1h.1q.1 0 .2-.1q-.1 0-.1 0c0 0 .1 0 .1 0Zm-.3-5.7c0 0 0-.1 0-.1c0 0 .1-.1 .1-.1c0 0 0 .1-.1 .1c0 0 0 .1 0 .1Zm.1-1.3v-.1v.1Zm.2 0c-.1 0-.1 .1-.1 .1l-.1 .1q.1 0 .1 0V48h.1Zm0 .4c0-.1 .1-.1 .1-.2c0-.1 .1-.1 .2-.1Zm.5-1.1c0 0 0 .1-.1 .1c0 .1-.1 .1-.1 .1c.1-.1 .1-.2 .2-.2Zm-.2 .7v-.1ZM727.3 47.6v-.1c0 0 .1 0 .1-.1c-.1 .1-.1 .2-.1 .2Zm0-.1c0 0 0-.1 0-.1q.1 0 .1 0c-.1 0-.1 .1-.1 .1Zm.2-.1h-.1Zm.1-.2c0 .1-.1 .2-.1 .2l.1-.1c0 0 0-.1 0-.1Zm-.1-.1c.1 0 .1-.1 .2-.2c.1 0 .1-.1 .1-.2c0 .1-.1 .2-.1 .2q-.1 .1-.2 .2Zm.3 0q-.1 0 0 0Zm.3 7.5q0 .1 0 .1v-.1Zm.1-8c-.1 0-.1-.1 .1-.1q0 .1-.1 .1Zm.4 7q-.1 .1-.2 .2c-.1 0-.1 .1-.2 .1c0 0 .1 0 .1-.1q.1 0 .2 0c0 0 .1 0 .1-.1c0 0 .1 0 .1 0q0-.1 0-.1q-.1 0-.1 0c0 0 0 .1 0 0v.1c0 0 0-.1 0-.1Zm0-7.4c0 0-.1 0-.1 .1v.1q-.1 0-.1-.1q0 .1 0 .1c0 .1-.1 .1-.1 .1c0-.1 .1-.1 .1-.2q.1-.1 .2-.1Zm-.2-.2h-.1h.1Zm.2 8.1q.1-.1 .1-.1q-.1 0-.1 0c0 0 0 .1 0 .1Zm.4-.1c0 0-.1 .1-.2 .1c0 .1-.1 .1-.2 .2q.1-.1 .2-.2c.1-.1 .2-.1 .2-.1Zm-.3-7.9l.1-.1c0 0-.1 0-.1 .1Zm.2 7.7q-.1 0-.1 0q-.1 .1 0 .1q.1-.1 .2-.2c.1 0 .2-.1 .2-.2q.2 0 .2-.1c-.2 0-.3 .1-.4 .2h.1c-.1 0-.1 .1-.1 0q.1 0 .1 .1c-.1 0-.2 0-.2 0Zm-.1-8q-.1 0 0 .1c0 0 0-.1 0-.1Zm0 7.9c0 0 0-.1 .1-.1c0-.1 .1-.1 .2-.2v-.1q.1 0 .1 0c-.1 0-.2 .1-.3 .2c0 0-.1 .1-.1 .2Zm0-.3q0 .1 0 .1Zm.2-8.1q-.1 0-.1 0Zm.1 .4H729v.1c-.1 0-.1-.1 0-.1Zm.1-.2q0 .1 0 .1c0 0-.1 0-.1 .1q0-.1 0-.1c.1 0 .1-.1 .1-.1Zm.1 7.5c0-.1 .1-.1 .1-.1c0 0-.1 0-.1 0q0 .1 0 .1Zm.5-8c-.1 0 0 0 0-.1c0 0 0 .1 0 .1Zm.1-.1c0 0-.1 0-.1 0c0 0 .1 0 .1 0Zm.1 8.5c0 0 0-.1 .1-.2c0 0 .1-.1 .2-.2c-.1 .1-.2 .2-.2 .3c0 0-.1 .1-.1 .1Zm.1-.6c.1 .1 0 .1 0 .2q0-.1 0-.1v-.1Zm1-.9c.1-.2 .1-.3 .2-.4c.1-.2 .2-.3 .2-.5c0 .2-.1 .3-.1 .5c-.1 .1-.2 .2-.3 .4Zm.5-.6c0 .1-.1 .1-.2 .3q0-.1 .1-.2c0 0 .1 0 .1-.1Zm-.1-11l.1-.1c0 0 0 .1-.1 .1Zm.2-.2q-.1 .1-.1 .1ZM731.7 51q0 .1 0 .1V51ZM732.1 50.1c0 .2-.1 .3-.2 .5c-.1 .1-.1 .2-.2 .4c.1-.2 .1-.3 .2-.4c.1-.2 .2-.3 .2-.5Zm3.9-9.5c.1 0 .2 0 .2 0c.1 0 .2-.1 .3-.1c0 0 .2-.1 .4-.2c.2-.1 .5-.2 .7-.3c.3-.2 .6-.3 .8-.4c.2-.1 .4-.1 .4-.2h-.1c-.2 .1-.4 .2-.7 .3c-.3 .2-.5 .3-.8 .4c-.3 .1-.5 .2-.8 .3c-.2 .1-.3 .2-.4 .2Zm2.8-1.1c0 0 .1 0 .1 0c0 0 .1 0 .1-.1Zm.3-.1c0 0 .1 0 .1 0q-.1 0-.1 0Zm.6-.1q-.1 0-.1 0Zm0-.1q0 .1 0 .1Zm.5-.4c0 0-.1 0-.1 0c0 0-.1 .1-.1 .1c0 0 0-.1-.1-.1q.1 0 .2 0c0 0 .1 0 .1 0Z' class='g0'/%3E%0A%3Cpath d='M752.8 52.1c-.2 .2-.3 .4-.4 .6c.1-.1 .1-.2 .2-.3c0 0 0-.1 .1-.2h-.1v.1l-.1 .1q-.1 0-.1 0q.1 0 .1 0c-.1 0-.2 .1-.2 .2c-.1 .1-.2 .2-.2 .2q-.1 0 0-.1h.1c-.2 0-.2 .1-.2 .1c-.1 .1-.2 .2-.3 .3c0 .1-.1 .2-.2 .3h.1l-.6 .5c0 0-.1 0-.1 0c0 0 0-.1 .1-.1l-.2 .1l.1-.1h-.1q0 .1 0 .1c0 0-.1 .1-.1 .1c0 0 0 .1 0 .1q-.1-.1-.1 0c0 0-.1 .1-.1 0q0 .1 0 .1h.1c-.1 0-.2 .1-.2 .1c-.1 .1-.2 .1-.3 0c0 0 0 .1 0 .1H750c0 .1-.1 .1-.2 .2c0 0-.1 .1-.2 .1c-.2 0-.2 .1-.3 .1l-1 .3l-.1 .2c-.1 0-.1-.1-.1-.1H748c0 0 .1 0 .1 0v-.1q-.1 .1-.2 0c0 0-.1 0-.1 .1c-.1 0-.3 0-.4 0c-.1-.1-.3-.1-.4-.1h-.1c-.2 0-.3-.1-.5-.1c-.1-.1-.2-.1-.4-.2q0-.1-.1-.2c-.1 0-.2-.1-.2-.2c0 0 0 .1 0 .1v.1c0-.1-.1-.1-.1-.1q0-.1 0-.2c-.1-.2-.2-.3-.3-.5c0-.2 0-.3-.1-.5h.1q0-.1 0-.1v-.1c.1 0 .1 .1 .1 .2c0-.5 0-1.1 .1-1.6c.2-.6 .4-1.1 .6-1.5v.1c-.1 .2-.2 .5-.3 .8c0 .3-.1 .6-.2 .9c0 .1 0 .2-.1 .4c0 .1 0 .2 0 .3c.1-.4 .2-.8 .3-1.2c.1-.5 .2-.9 .4-1.2c.2-.6 .4-1.1 .7-1.6c.2-.4 .5-.9 .8-1.4l.5-.7c.1-.1 .2-.3 .3-.4c.1-.1 .2-.2 .3-.3c.1-.1 .2-.2 .3-.3c.1-.2 .2-.3 .4-.3c.2-.3 .4-.5 .6-.7c.2-.2 .4-.4 .6-.6c.1-.1 .2-.2 .3-.3c.1-.1 .2-.2 .3-.3l.9-.8l1.2-.8c0-.3 0-.5 .1-.6c0-.1 0-.2 0-.3c0-.1 0-.2 .1-.3c0-.1 0-.3 0-.5c.1 0 .1-.1 .1-.3c-.1 .1-.1 .2-.2 .2q-.1 .1-.1 .3l-.3 .2l-.4 .5c.1 0 .2-.1 .2-.2c.1-.1 .1-.2 .2-.2c0 0 .1-.1 .2-.1c.1 0 .1-.1 .2-.1c-.1 .1-.3 .3-.5 .5c-.1 .1-.3 .3-.4 .4c-.1 .1-.2 .1-.3 .2c-.1 .1-.2 .2-.2 .3l-.2 .2q0 .1 0 .2h-.1v.1c-.1 0-.1-.1-.2-.1q0 .1 0 .2c-.1 0-.1 .1-.2 .1c0 0 0 .1 0 .1q-.1 0-.1 .1c0-.1 .1-.1 .1 0c-.1 0-.2 0-.3 .1c-.1 0-.2 0-.2 .1c-.2 0-.3 .1-.3 .1c0 0-.1 .1-.3 .1c-.1 0-.2 0-.3 0c-.1 0-.2 0-.2 0q-.1 0-.2 .1c-.4-.1-.7-.2-1-.4c-.1 0-.2-.1-.3-.1c-.1-.1-.2-.2-.3-.3c-.2-.2-.2-.5-.2-.7c0-.3 0-.5 0-.8c.2-.8 .3-1.6 .6-2.3c.2-.7 .5-1.4 .7-2.1h.1c.1-.3 .2-.7 .3-1c.1-.3 .2-.7 .2-1c.2-.1 .3-.3 .4-.4c.2-.2 .3-.2 .6-.2c0 0 .1 0 .1 0q0-.1 0-.1q.1 .1 .1 .1c.1 0 .2 0 .2 0c0 .1 .1 .1 .2 .1c0 .1 .1 .1 .2 .2c0 0 .1 0 .2 .1c.2 .1 .3 .3 .4 .4c.2 .2 .3 .3 .3 .5c0 .2 0 .4-.1 .5c0 .1-.1 .3-.2 .4c0 .1 0 .2-.1 .3c0 .1 0 .2-.1 .3c-.1 .2-.1 .4-.2 .6c-.1 .2-.2 .3-.2 .5l-.3 .9c-.2 .5-.3 .9-.4 1.2c-.2 .4-.3 .8-.4 1.3c-.1 .1-.1 .2-.1 .3c-.1 .2-.1 .3 0 .3q0 .1 0 .1c.2-.1 .4-.2 .6-.4c.3-.2 .4-.4 .6-.6c.2-.2 .4-.4 .6-.6c.2-.2 .3-.4 .4-.5c.2-.2 .3-.4 .4-.5l.5-.6q.1 0 .1 0c.1-.2 .2-.4 .3-.7c.2-.2 .3-.4 .4-.6c.1-.1 .2-.2 .2-.3c0-.1 0-.2 .1-.4l.3-1.2c0 0 0-.1 0-.1q-.1 0-.1 0c.1 0 .1-.1 .2-.1c0-.1 0-.2 0-.2q.1-.1 .1-.1h.2l.3-.4c0 .1 .1 .1 .1 0c.2 0 .4 .1 .5 .1c0 .1 .1 .1 .2 .1c0 .1 .1 .1 .1 .2c.1 0 .2 0 .3 0v.1c.1 0 .2 .1 .2 .1c.1 0 .1 .1 .2 .1q0 .1 0 .2q0 .1 .1 .2c0 0 0 .1 0 .2c0 .1-.1 .2-.1 .4c-.1 .1-.1 .2-.2 .4c0 .2 0 .4-.1 .5c0 .2-.1 .3-.1 .5c-.1 .3-.2 .6-.2 .8c-.1 .2-.2 .4-.2 .6c-.1 .2-.1 .5-.1 .7c-.1 .2-.1 .5-.1 .8c0 0 .1 0 .1 0c.3-.1 .6-.2 1.1-.5c.5-.2 1-.4 1.5-.6c.5-.3 1.1-.5 1.6-.7c.4-.2 .8-.3 1.1-.4c0 0 0 .1 0 .1q.1 0 .1 0c0 0 0 .1 0 .2v-.1c0 .1 .1 .1 .1 .1c0 0 .1 0 .1 0c0 0 .1 0 .2 0q-.1 0-.2 0c-.1 0-.1 .1-.2 .1q.1 0 .2 0c0 0 .1-.1 .2-.1c-.1 .1-.2 .1-.3 .1c-.1 0-.2 .1-.2 .1c0 .1-.1 .2-.2 .2c-.1 0-.2 .1-.3 .1h.1c-.1 0-.1 .1-.1 .1h-.1l-.2 .1c.1 0 .2 0 .3-.1c0 0 .1 0 .1 0c.1-.1 .2-.1 .2-.2c.1 0 .2 0 .2 0c0 0 0 .1-.1 .1c-.1 .1-.2 .1-.2 .1c0 0 .1 0 .2 0c0 0-.1 0-.1 .1q-.1 0-.2 0c-.1 0-.1 .1-.2 .1c-.1 .1-.2 .1-.3 .1l.1-.1l-.2 .1c0 0-.2 .1-.5 .3c-.3 .2-.7 .4-1.1 .6c-.4 .2-.8 .4-1.2 .6c-.3 .2-.5 .3-.6 .4c-.1 0-.2 0-.3 .1q-.1 .1-.2 .2c0 0 .1 0 .1 0c0 0 .1 0 .2 0q-.1 0-.2 0q-.1 0-.1 .1c-.2 .1-.3 .1-.4 .2c-.1 0-.2 .1-.3 .2l-.1 .1c-.1 .6-.2 1-.3 1.5c-.1 .4-.2 .9-.3 1.5c-.1 .9-.2 1.7-.4 2.5c-.2 .7-.5 1.5-.8 2.2c.1-.3 .2-.6 .3-.9c.2-.3 .2-.7 .3-1c-.2 .5-.4 1-.5 1.4c-.2 .5-.4 1-.6 1.4v.1l-.1-.1c-.1 .1-.2 .3-.2 .4c-.1 .2-.2 .3-.3 .5V52l-.1 .2Zm-7.6 .7c0 0 .1 .1 .1 .1h-.1v-.1Zm.1 .6q.1 .1 .1 .2c0 .1 0 .2 .1 .3q0-.1 0-.2c-.1 0-.1-.1-.1-.2v-.2Zm.6 1.3q0 .1 0 0q-.1 0-.1-.1ZM746.3 49.6c0 .1 0 .2-.1 .2q0 .1 0 .1c0 0 0-.1 .1-.3Zm.4-.8c0 .1-.1 .3-.1 .4c-.1 .2-.2 .3-.3 .4Zm.1-.2l.1-.1Zm2.1-.5c-.1 .1-.1 .2-.2 .3c0 .1-.1 .2-.1 .3q0-.1 0-.2v.1l-.3 .3q0 .1 0 .1l-.1 .1v.2v-.1l-.2 .3v-.1l.5-.8h-.2v.1c0-.1 .1-.1 .1-.1c0 .1-.1 .1-.1 .1q0 .1 0 .1q0-.1 0-.1c0 0 0-.1 .1-.1q0-.1 0-.2c0 0 .1-.1 .1-.2c.1 0 .1-.1 .2-.1c.1-.3 .3-.6 .5-.9c.2-.3 .4-.5 .6-.8c0 0 .1 0 .1 0q.1-.1 .2-.2c0-.1 .1-.1 .1-.2l.1-.1V46q0-.1 0-.1c0 0 .1 0 .1-.1c-.1 0 0 0 0 0c0-.1 .1-.1 .1-.2q.1 0 .1 0c.1 0 .1-.1 .1-.1c0-.1 .1-.1 .1-.2q0 .1 0 .1c0 0 0 .1 0 .1q-.1 .1-.2 .2c0 0-.1 0-.1 .1l-.2 .3c.2-.2 .3-.4 .5-.6c.1-.1 .3-.3 .5-.5c-.1 .1-.2 .1-.2 .2c-.1 0-.1 .1-.2 .1c0 0 .1 0 .1-.1q0-.1 .1-.1q.1-.1 .1-.1c.1-.2 .3-.3 .4-.4c.2-.1 .3-.3 .4-.4q.1-.1 .1-.1h.1q0-.1 0-.1q.1-.1 .1-.1c.1-.1 .2-.1 .3-.2c0 0 .1-.1 .1-.2h.1c0 0 .1-.1 .2-.1q.1-.1 .1-.2q0-.1 0-.1q-.1 0-.1 0q.1-.1 .1-.2c-.1 .1-.2 .2-.3 .3c-.1 .1-.2 .2-.3 .2q0 .1 0 .1c0-.1 0 0 0 0c0 0-.1 0-.1 0q0 .1 0 .1c0 0 .1 0 .1-.1c0 0 .1 0 .1-.1q0 .1 .1 0q-.1 .1-.2 .2q0 .1-.1 0c-.1 .1-.2 .2-.2 .3q-.1 .1-.2 .2h-.1L751 45c0 0-.1 0-.1 0q0 .1 0 .1c-.3 .3-.5 .6-.7 .8c-.3 .3-.5 .6-.7 .8h-.1l-.2 .4l-.3 .3c0 .1 0 .2-.1 .3c-.1 0-.1 .1-.2 .2c.1-.1 .1-.2 .2-.2c0-.1 0-.2 .1-.3c-.2 .3-.3 .5-.5 .8c-.2 .2-.3 .4-.4 .7c-.1 .1-.1 .2-.2 .2c0 .1-.1 .2-.1 .3l.3-.4c-.1 .2-.2 .4-.3 .6c-.1 .1-.2 .3-.3 .4c0 .2-.1 .4-.2 .6c0 .2-.1 .4-.1 .6v.2q-.1 .1-.1 .1q0 .1 0 .2v.1c0 .2 0 .4-.1 .7c-.1 .2 0 .4 .1 .6c0-.1 0-.2 0-.3q0-.1 0-.2c0-.1 0-.2 0-.2v.1c.1 .1 .1 .2 .1 .3c0 .1 0 .3 0 .3q0-.1 .1-.1c0 .1 0 .2 0 .3c0 .1 0 .2 .1 .3c0 0 .1 .1 .1 .2q0 .1 .1 .2c0 .1 .1 0 .1 0c0 .1 .1 .1 .1 .1c.1 0 .2 .1 .4 .1q0-.1 0-.1V54q0 .1 .1 .1c0-.1 0 0 0 0c.4-.1 .7-.3 .9-.5c.3-.2 .5-.4 .8-.7v-.1c0 0 0 .1 0 .1q0-.1 0-.1c0 0 .1 0 .1 0c.1-.2 .2-.3 .2-.4c.1-.1 .2-.2 .3-.4c.2-.2 .3-.5 .5-.7c.1-.3 .2-.6 .3-.9c.1-.1 .1-.2 .1-.2q.1-.1 .1-.2c0 0 .1-.1 .1-.2c0-.1 0-.2 0-.3c0 0 .1-.1 .1-.1c0 0 .1-.1 .1-.1l.1-.1c0 0 0-.1 0-.1q0-.1 0-.2h.1v-.1c0-.1 .1-.3 .1-.4c0-.2 .1-.3 .2-.4c-.1-.1 0-.2 0-.3q.1-.1 .1-.2c0-.1 .1-.2 .1-.4c0-.1 0-.2 0-.3q0-.1 0-.1q0-.1 .1-.2c0 0 0-.1 0-.1q0-.1 0-.2c0 0 0-.1 0-.1c.1 0 .1-.1 .1-.1c0-.2 .1-.4 .1-.6c0-.2 0-.4 0-.6c.1-.1 .1-.2 .1-.2c.1-.2 .1-.4 .1-.6c.1-.2 .1-.4 0-.5q0 .1-.1 .2v-.1c-.2 .2-.4 .4-.6 .5c-.2 .1-.3 .3-.5 .5q-.1 0-.1 0c0 0 0 .1 0 .1l-.5 .6h-.1c-.1 0-.1 .1-.1 .1c.1 0 0 .1 0 .1v-.1q0 .1-.1 .1v.1l-.2 .1l-.2 .3h-.1q0 .1 0 .1h.1c0 0-.1 0-.1 0v.1c0 0-.1 0-.1-.1q0 .2-.1 .2c-.1 0-.1 .1-.2 .2c-.1 .1-.2 .2-.2 .4l-.2 .2q0-.1 0-.1v.1l-.1 .1q-.1 .1-.2 .2c0 0-.1 .1-.1 .2c-.1 0-.1 .1-.2 .1c.1 0 .1-.1 .1-.1c-.1 .1-.2 .2-.3 .3c-.1 .2-.2 .3-.2 .5q-.1 0-.1 0q0 .1 0 .1v.1l.1-.2c0 0 .1 0 .1 0c0-.1 .1-.2 .2-.3Zm-2 4.6c0 .1 .1 .1 .1 .1c0 0-.1 0-.1 0v-.1Zm.1-.1c-.1 0-.1-.1-.1-.1c0 0 .1 0 .1 0Zm.1-.9c0 .1-.1 .2 0 .3c0 0 0 .1-.1 .3q0-.1 0-.1c0 0 0-.1 0-.1V52c0-.1 .1-.2 .1-.3Zm0-.2v.1c0 0 0-.1 0-.1Zm0 .4c0 0 0 .1 0 .1c0 .1 0 .2 0 .3c0-.2 0-.3 0-.4Zm.1-.1q-.1-.1-.1-.1c0 0 0 .1 .1 .1Zm-.1 .6q.1 0 .1 .1c0 0 0 .1-.1 .1Zm.1-1.3c0 .1 0 .2 0 .2c0 .1 0 .2 0 .3c-.1-.2 0-.4 0-.7c.1-.2 .1-.4 .2-.6q0-.1 .1-.1c0 0 0-.1 0-.1Zm.1 .3c0 .2-.1 .4-.1 .6c0-.3 0-.5 .1-.6Zm-.1 .3v-.1Zm.1-1.2c0 0 0 .1 0 .1c0 .1-.1 .2-.1 .2c0 0 0-.1 .1-.2c0 0 0-.1 0-.1Zm0 .8q0-.1 0-.1c0-.1 .1-.1 .1-.2Zm.1-.3q-.1 0-.1 0q.1-.1 .1 0Zm.1-.4h.1l-.1 .2c-.1 0-.1-.1-.1-.1c0 0 0-.1 0-.1h.1Zm-.1 .2h.1l-.1 .1v-.1Zm.1-.9c0 0 .1-.1 .1-.1c-.1 0-.1 .1-.1 .1Zm.1 .6v.1v-.1ZM747.6 49.8c0 0 .1 0 .1 0Zm.1 .5h-.1q.1-.1 .1 0Zm.1-.4h-.1Zm0 .5v-.1Zm.1-1.7c0-.1 .1-.1 .1-.1q-.1 0-.1 .1Zm0 .9l.1-.1Zm.1-.4v.1c0-.1 .1-.2 .1-.2c0-.1 .1-.2 .1-.2q0-.1 .1-.1c0 .1 0 .2-.1 .3c-.1 .1-.1 .2-.2 .3Zm.1-.4c0 0 0 .1 0 .1c0 0-.1 0-.1 0l.1-.1Zm0 .1V49q0-.1 0-.1Zm.2-.5q0 .1 0 .1c-.1 0-.1 .1 0 .1q-.1 0-.1 0c0 .1-.1 .1-.1 .1c0 0 0-.1 .1-.1q0-.1 .1-.2Zm-.2 .5c.1 0 .1-.1 .1-.1c0 0 0 .1 0 .1q-.1 0-.1 0ZM748.3 48.9V49l.1-.1Zm.3 6c0 0-.1 0-.1 0c0 0-.1 0-.2 .1q.1 0 .2 0q.1 0 .1-.1Zm-.2-5.7c0 0 0-.1 0-.1c0 0 0-.1 .1-.1c0 0 0 .1-.1 .1c0 0 0 .1 0 .1Zm.1-1.3v-.1v.1Zm.1 0c0 0 0 .1 0 .1c0 0-.1 0-.1 .1c0 0 .1 0 .1 0V48Zm.1 .4c0-.1 .1-.1 .1-.2c0-.1 .1-.1 .2-.1Zm.5-1.1c0 0-.1 .1-.1 .1c0 .1-.1 .1-.1 .1c.1-.1 .1-.2 .2-.2Zm-.2 .7v-.1ZM749.2 47.6v-.1c0 0 .1 0 .1-.1c-.1 .1-.1 .2-.1 .2Zm0-.1c0 0 0-.1 0-.1c0 0 .1 0 .1 0c-.1 0-.1 .1-.1 .1ZM749.5 47.2c0 .1-.1 .2-.1 .2v-.1c.1 0 .1-.1 .1-.1Zm-.1-.1c.1 0 .1-.1 .2-.2c0 0 .1-.1 .1-.2c0 .1-.1 .2-.1 .2q-.1 .1-.2 .2Zm.3 0c0 0-.1 0-.1 0q.1 0 .1 0Zm.3 7.5q0 .1-.1 .1q.1 0 .1-.1Zm.1-8c-.1 0-.1-.1 .1-.1c0 .1-.1 .1-.1 .1Zm.4 7c-.1 .1-.2 .1-.2 .2c-.1 0-.1 .1-.2 .1c0 0 .1 0 .1-.1q.1 0 .1 0q.1 0 .2-.1h.1q0-.1 0-.1q-.1 0-.1 0c0 0 0 .1 0 0v.1c0 0 0-.1 0-.1Zm0-7.4q-.1 0-.1 .1l-.1 .1v-.1q0 .1 0 .1c0 .1-.1 .1-.1 .1c0-.1 .1-.1 .1-.2q.1-.1 .2-.1Zm-.2-.2h-.1h.1Zm.2 8.1c0-.1 .1-.1 .1-.1q-.1 0-.1 0c0 0 0 .1 0 .1Zm.4-.1c0 0-.1 .1-.2 .1c0 .1-.1 .1-.2 .2q.1-.1 .2-.2c.1-.1 .2-.1 .2-.1Zm-.3-7.9V46v.1Zm.2 7.7q-.1 0-.2 0q0 .1 .1 .1q.1-.1 .2-.2c.1 0 .2-.1 .2-.2q.2 0 .2-.1c-.2 0-.3 .1-.4 .2c0 0 0 .1 0 0v.1c0 0-.1 0-.1 0Zm-.1-8q-.1 0 0 .1c0 0 0-.1 0-.1Zm-.1 7.9c.1 0 .1-.1 .2-.1c0-.1 .1-.1 .2-.2v-.1q.1 0 .1 0c-.1 0-.2 .1-.3 .2c-.1 0-.1 .1-.2 .2Zm.1-.3q0 .1 0 .1Zm.2-8.1q-.1 0-.1 0Zm0 .4q.1 0 0 0v.1c-.1 0-.1-.1 0-.1Zm.2-.2q0 .1 0 .1q-.1 0-.1 .1q0-.1 0-.1c.1 0 .1-.1 .1-.1Zm.1 7.5c0-.1 .1-.1 .1-.1c0 0-.1 0-.1 0q0 .1 0 .1Zm.4-8l.1-.1c0 0-.1 .1-.1 .1Zm.2-.1q-.1 0-.1 0h.1Zm.1 8.5c0 0 0-.1 .1-.2c0 0 .1-.1 .2-.2c-.1 .1-.2 .2-.2 .3c0 0-.1 .1-.1 .1Zm.1-.6c.1 .1 0 .1 0 .2q0-.1 0-.1v-.1Zm1-.9c0-.2 .1-.3 .2-.4c.1-.2 .2-.3 .2-.5c0 .2-.1 .3-.1 .5c-.1 .1-.2 .2-.3 .4Zm.5-.6c0 .1-.1 .1-.2 .3q0-.1 .1-.2l.1-.1Zm-.1-11l.1-.1c0 0 0 .1-.1 .1Zm.2-.2q-.1 .1-.1 .1ZM753.6 51q0 .1 0 .1V51ZM754 50.1c0 .2-.1 .3-.2 .5c-.1 .1-.1 .2-.2 .4c.1-.2 .1-.3 .2-.4c.1-.2 .1-.3 .2-.5Zm3.9-9.5q.1 0 .2 0c.1 0 .2-.1 .3-.1c0 0 .1-.1 .4-.2c.2-.1 .5-.2 .7-.3c.3-.2 .6-.3 .8-.4c.2-.1 .3-.1 .4-.2h-.1c-.2 .1-.4 .2-.7 .3c-.3 .2-.5 .3-.8 .4c-.3 .1-.5 .2-.8 .3c-.2 .1-.3 .2-.4 .2Zm2.8-1.1c0 0 .1 0 .1 0c0 0 .1 0 .1-.1Zm.3-.1c0 0 .1 0 .1 0q-.1 0-.1 0ZM761.6 39.2q0 .1-.1 .1Zm.5-.4c0 0-.1 0-.1 0c0 0-.1 .1-.1 .1c0 0 0-.1-.1-.1q.1 0 .2 0c0 0 .1 0 .1 0Z' class='g0'/%3E%0A%3Cpath d='M765.9 37.8c-.1 .2-.1 .3-.1 .4c-.1 .1-.1 .2-.1 .3l.2-.5c0 0 0 .1 0 .2c0 .2-.1 .3-.1 .3c.1 0 .2 0 .3 0c0 0 .1 0 .2 0c.1 0 .1-.1 .2-.1h.2c.1 0 .2-.1 .3-.1h.1c.1 0 .2 0 .3-.1c.2-.1 .3-.1 .5-.2c.1-.1 .3-.1 .5-.2c0 0 .1 0 .1 0q.1 0 .2-.1c.2-.1 .3-.1 .4-.2c.2-.1 .3-.1 .5-.2c0 0 .1 .1 .1 0h.1c0 .1 .1 .1 .2 .1c0 .1-.1 .1-.1 .1c0 0 0 .1-.1 .1v.1c0 .1-.2 .2-.4 .2c0 0 0 .1 0 .1q-.1 0 0 .1c-.1 0-.2 0-.3 .1c-.1 .1-.2 .1-.4 .2c0 0 0 .1 0 .1q.1 0 .2 0c0 0 .1 0 .1-.1c-.1 .1-.3 .2-.6 .3c-.1 0-.2 0-.3 .1c-.1 0-.2 .1-.3 .1h.1c-.1 .1-.3 .1-.4 .2q-.1 0-.2 .1q-.1 0-.2 0c-.1 .1-.2 .1-.3 .2c-.1 0-.2 0-.3 0c-.1 0-.3 0-.4 .1c-.2 0-.3 0-.5 0c-.1 .3-.2 .6-.3 .9c-.1 .3-.2 .5-.4 .8l-.1 .3h-.1h.1q-.1 0-.2 0q0 .1 0 .1q0-.1 0-.1q.1 0 .1-.1c-.1 .1-.2 .2-.2 .3q0-.1 0-.1q-.1 .1 0 .1v.1l-.1 .2c0-.1 .1-.2 .1-.3q0 .1 0 .2q-.1 .1-.1 .2l-.2 .2v-.1c-.1 .1-.2 .2-.2 .2c-.1 .1-.2 .2-.2 .3q0 .1-.1 .1c0 .1-.1 .1-.1 .1l-.3 .4l-.2 .2q.1 0 .1-.1q.1 0 .1-.1q.1 .1 0 .1v.1c-.2 .1-.4 .3-.8 .6c0 0-.1 0-.1 0c-.1 0-.2 0-.2 0v.1c-.1 0-.3 .1-.4 .1q-.1 0-.2 0c-.1 0-.2 .1-.3 .1c-.2 0-.5 0-.7 0c-.1 0-.3 0-.4-.1l-.1 .1c-.2-.1-.3-.1-.4-.2c-.1-.1-.2-.2-.3-.2v-.1q-.1-.1-.1-.1c-.1 0-.1-.1-.1-.2c0-.1-.1-.1-.1-.2v.1l-.1-.4V43c0 0 0-.1 0-.1c-.1-.3-.2-.5-.3-.8c0-.3 0-.6 0-1c0-.5 .1-1 .2-1.5c.1-.5 .3-1 .5-1.5c.2-.5 .4-1 .6-1.4c.3-.5 .6-.8 .8-1.2c0-.1 .1-.2 .2-.2l.1-.1h.1c0-.1 .1-.1 .1-.1c.1-.1 .2-.1 .2-.1c0-.1 .1-.2 .2-.2q.1 0 .2-.1c0 0 .1 0 .2 0c.1 0 .1-.1 .2-.1c0-.1 .1-.1 .2-.1c.1 0 .3 0 .5 0c.1 0 .2 0 .3-.1q.1 0 .2 0c.1 0 .3 0 .5 .1l.1-.1c.2 .1 .5 .2 .7 .4c.3 .1 .5 .3 .5 .6q.1 0 .1 0h.1v.1c.1 .2 .1 .4 .1 .6c0 .2 .1 .4 .1 .7c.1 .1 .1 .2 .1 .3q.1 .1 .1 .3c-.1 0-.1 .1-.1 .1c.1 .1 .1 .2 .1 .3Zm-2.5 1.9c-.2 0-.4-.1-.6-.1c-.1 0-.3-.1-.5-.1c-.1-.1-.3-.2-.5-.3c-.1-.1-.3-.3-.5-.5c-.1 .1-.1 .2-.1 .4c-.1 .1-.1 .3-.2 .5c0 .2 0 .3-.1 .5c0 .2 0 .3-.1 .4c0 .1 0 .2 0 .3c0 0 0 .1 0 .2v.2c-.1 .2-.1 .4 0 .6c0 .2 0 .4 .1 .6c0 .1 .1 .2 .1 .3c0 .1 .1 .1 .2 .2c0 .1 .1 .1 .1 .3q.1 .1 .2 .1c0 0 .1 0 .2 0c0-.1 .1-.1 .1-.2l.6-.5l.7-1.2l.4-.8c.1-.1 .1-.3 .2-.5c0-.1 0-.3 .1-.4q-.1-.1-.2 0q-.1 0-.2 0Zm.6-1.8c0-.2 0-.4 0-.6c0-.2 0-.3 0-.4c0-.1 0-.2-.1-.2c0 0-.1-.1-.1-.1c0-.1 0-.2 0-.2c0-.1 0-.2 0-.2q-.1-.1-.2-.1h.1q-.1 0-.1 0h-.1c.1 0 0-.1 0-.1c-.1 0-.1-.1-.2-.2q.1 .1 .1 .1c0 0 0-.1 .1-.1l-.1-.2c0-.1-.1-.1-.1-.1c0 0-.1 0-.1 0c-.1 0-.2 .1-.2 .1c-.1 .1-.1 .2-.2 .3c-.1 0-.2 .1-.2 .2c-.1 0-.1 .1-.1 .2q-.1 0-.1 0l-.2 .4c-.1 .1-.1 .3-.1 .5c0 .3 .1 .4 .1 .6c.2 .1 .3 .3 .5 .4c.2 .2 .4 .3 .6 .4v.1c.1 0 .2 0 .3 0c.1 0 .2 0 .3 0c.1-.1 .1-.3 .1-.4c0-.2 0-.3 0-.4ZM764 42.4h.1H764q-.1 0 0 0Zm1.1-1.4c0 0 0 .1 0 .1q-.1 .1-.1 .2q0-.1 0-.2c0 0 .1-.1 .1-.1Zm.2-5.6q.1 .1 .1 .1q0 .1 0 .1q0 .1 0 .1c0 .1 .1 .1 .1 .2c0 0 0 .1 0 .1c0 0 0 .1 .1 .1c-.1-.1-.1-.3-.1-.4c0-.1-.1-.2-.2-.3Zm.2 4.7q0 .1 0 .1q-.1 0-.1 0c0 0 0-.1 .1-.1Zm.4-2.2v-.1Z' class='g0'/%3E%0A%3Cpath d='M779.1 41v-.1h.1l-.2 .3c0 .1-.1 .2-.2 .2c0 .1-.1 .2-.1 .3l-.2 .2c.1 0 .1-.1 .2-.2c0 0 .1-.1 .2-.2c-.1 .1-.1 .2-.2 .2c0 .1-.1 .1-.1 .2q-.1 .1-.2 .2c0 .1-.1 .2-.1 .2q-.1 0-.1 .1c-.1 .1-.3 .2-.5 .3c-.1 .1-.3 .2-.4 .3v.1q-.1 0-.2 0c0 0-.1 0-.1 0v.1q-.1 0-.2 0q-.1 0-.2 0c0 0-.1 .1-.1 .1q-.1 0-.1 0c.1 0 0 0 0 0c-.1 0-.2-.1-.3-.1c-.1-.1-.2-.1-.3-.1c-.1-.1-.2-.2-.3-.2c0 0-.1-.1-.1-.1c-.2-.1-.4-.3-.5-.5c-.2-.2-.3-.4-.4-.6l-.1-.1q.1 0 .1 0c0-.1-.1-.2-.1-.3c0-.1-.1-.2-.1-.3c0-.1 0-.2 0-.2v-.1c0 0 0-.1-.1-.1v-.9c-.1 0-.1-.1-.1-.1c0-.1 0-.2 0-.3c0 0 0-.1 0-.1c0-.1 0-.2 0-.3c-.2 .4-.6 .8-.9 1.4c-.3 .5-.7 1-1 1.4c-.2 .2-.4 .4-.5 .6c-.2 .2-.4 .4-.6 .5q0 .1 0 .1c-.1 0-.2 .1-.3 .1c-.1 .1-.3 .1-.4 .1c-.1 .1-.2 .1-.3 .1c-.1 .1-.2 .1-.3 .1c-.2 0-.3-.1-.4-.1c-.1-.1-.3-.1-.4-.1c-.1-.1-.2-.1-.3-.2c-.1 0-.2-.1-.3-.2c-.2-.3-.3-.6-.3-.9c-.1-.3-.1-.6 0-.9c0-.4 .1-.7 .1-.9c0-.1 0-.2 0-.3c0 0 .1-.1 .1-.2c0-.3 .1-.6 .2-1c.1-.3 .2-.7 .3-1c.1-.4 .3-.8 .4-1.1c.1-.4 .2-.8 .3-1.2c.1-.1 .3-.2 .4-.5c.1-.1 .2-.1 .3-.1c.1 .1 .2 .1 .3 0c.2 0 .4 .1 .6 .2c.2 .1 .4 .2 .5 .2c.1 .1 .2 .2 .2 .3c.1 .2 .1 .3 0 .5c0 .1 0 .3-.1 .5c0 .1-.1 .3-.1 .4l-.1 .7c-.1 .2-.1 .4-.2 .6c-.1 .3-.2 .5-.2 .7c-.1 .4-.2 .9-.3 1.3c-.2 .5-.2 1-.2 1.5c.2-.1 .4-.4 .6-.7c.2-.3 .4-.6 .6-.8c0 0 .1-.1 .1-.1q0-.1 .1-.2c.1-.2 .3-.4 .4-.7c.1-.2 .3-.5 .4-.8c.2-.3 .4-.7 .6-1.1c.2-.4 .4-.8 .6-1.2c.1-.1 .2-.3 .3-.5c.1-.3 .2-.5 .3-.7l.1-.1c0 0 0-.1 0-.1q.1-.1 .1-.1q0-.1 .1-.1l.1-.2c0 0 .1 .1 .1 .1q.1 0 .1 .1h.1q-.1 0 0 0q.1 0 .1-.1q.1 0 .2 0v.1c.1 0 .2 .1 .3 .2c0 .1 .1 .1 .3 .1c0 .1 .1 .1 .1 .1v.1q0 .1 0 .2v-.1c0-.1 .1-.1 .1-.1c0 0 0 .1 0 .1q0 .1 0 .1q0 .1 .1 .1q0-.1 0-.1q.1 0 .2 0c0 0 0 .1 0 .1l.1 .2c0 .2 0 .3 0 .4c0 .1 0 .2 0 .3v.3l-.4 1.7v.1c-.1 .6-.2 1.2-.3 1.7c-.1 .6 0 1.1 .1 1.6q.1 .2 .2 .3c0 0 0 .1 .1 .2c0 .1 0 .2 .1 .3h.1v-.1c.1-.1 .2-.1 .1-.1q0 .1 0 0c.3-.1 .5-.3 .7-.5c.3-.3 .5-.5 .7-.8c.2-.3 .4-.6 .6-1c.2-.3 .3-.6 .5-.8q-.1-.1 0-.1q0 .1 0 0h-.1c.1 0 .1-.1 .1-.1q.1 0 .1-.1c0-.1 .1-.1 .1-.1c0-.1 0-.2 .1-.3c0 0 0-.1 .1-.2c0 0 0-.2 0-.3h.1v.2c0-.1 0-.3 0-.4c.1-.2 .1-.3 .3-.3c0 0 0-.1 0-.2c0 0 0-.1 .1-.2c0 0 0 .1 0 .1c0 0 0 .1 0 .2q0 .1 0 .2v.3c0 0 .1 0 0 0q0-.1 .1-.1v.1c0 0 0-.1 0-.1c0 0 0 .1 0 .2c0 0-.1 .1-.1 .1v-.1v.2c-.1 .1-.1 .2-.1 .3c-.1 .1-.1 .2-.1 .3l.1-.4c0 0 0 .1 0 .2c0 .1 0 .2-.1 .2c0 0 0 .1 0 .1q0 .1 0 .2c0-.1 .1-.2 .1-.3c0-.1 .1-.2 .1-.4c0 0 0-.1 .1-.1c0-.1 0-.2 .1-.2c-.1 .3-.3 .7-.4 1.1c-.2 .4-.4 .7-.5 1.1c-.1 0-.1 .1-.2 .3l.1-.2q0 .1 0 .2c0 0-.1 0-.1 .1q.1-.1 .1-.2c0-.1 .1-.1 .1-.1c.1 0 0 0 0 0c0 0 0 .1 0 .1c-.1 .1-.2 .2-.2 .2c-.1 .3-.2 .4-.3 .6c-.1 0-.1 .1-.1 .1q0 .1 0 .2l.1-.2c0 0 0-.1 0-.1Zm-3.6-6.6q0-.1 0-.1l-.1-.1c0 .1 .1 .1 .1 .2Zm.1-.1h-.1c0 0 0 .1 .1 .1Zm.8 4.3v-.2Zm0-.5q.1 0 0 .1c0 0 0 .1 0 .1v-.2ZM777.4 43.1h-.1c0 0-.1 .1-.1 .1v-.1h.1h-.1q.2 0 .2 0Zm.7-.6c0 .1-.1 .2-.3 .3q-.1 .1-.2 .1c0 .1-.1 .1-.2 .2q.1-.1 .1-.1q.1-.1 .2-.1v-.1c.1-.1 .2-.1 .2-.1h.1q0-.1 0-.2Zm-.6 .4V43Zm0 0c.1 0 .1-.1 .2-.1c0 0 0 .1 0 .1q-.1 0-.2 0Zm1.1-1.3l.1-.1l.1-.1h-.1v.1c-.1 0-.1 .1-.1 .1Zm.5-.7c0 0 0-.1 0-.1q.1 0 .1 0c-.1 0-.1 .1-.1 .1Zm.1-.1l-.1 .1Zm0 .1v-.1Zm.1-.2q0 .1-.1 .1q0-.1 .1-.1Zm0-.1h.1c0 0-.1 0-.1 0Zm.2-.4q0 .1 0 .1q.1-.1 .1-.1q0 .1 0 .1q-.1 .1-.1 .1v.1h-.1v.1c0-.1 0-.2 .1-.2c0 0 0-.1 0-.2Zm.1-.3h-.1q.1 0 .1-.1c0 0 0 .1 0 .1v-.1Zm.1 0c-.1 0-.1 .1-.1 .1h-.1h.1q0-.1 0-.1q.1 0 .1 0Zm-.1-.1c0 0 0-.1 0-.1Zm.1 0v-.2c0 0 0 .1 0 .1q0 .1 0 .1c0 0-.1 .1-.1 .1q0-.1 .1-.1Zm0 .2v.1q0-.1 0-.1Zm0-.4v.1q0-.1 0-.2Zm0 .3q.1 0 0 0c0 0 0 .1 0 .1c0 0 0-.1 0-.1Zm.1-2.3c0 0 0 .1-.1 .1q0-.1 .1-.1Zm0 1.9c0 0 .1 0 0 0q0-.1 .1-.1l.1-.1l-.2 .3ZM780.2 38v.1ZM780.5 37.7c0 .1-.1 .2-.1 .3c-.1 .1-.1 .2-.1 .3c-.1-.1 0-.2 0-.3c.1-.1 .1-.2 .2-.3Z' class='g0'/%3E%0A%3Cpath d='M784.9 36.9l-.1 .1l.1-.1c-.2 .1-.4 .3-.6 .5c-.2 .2-.3 .4-.5 .5q-.1 .1-.1 .1l-.1 .1c0 0 0 .1-.1 .1l-.1 .2v.1c-.1 .1-.2 .2-.3 .3c-.1 .1-.1 .2-.2 .4l-.4 .7v.2c-.1 .1-.1 .2-.1 .2q0 .1 0 .2v.1c0 .1 0 .2-.1 .4c0 .2-.1 .4-.1 .6c0 .1 0 .2 0 .3c0 .1 0 .3 0 .4c0 .1 0 .3-.1 .5c0 0-.1 .1-.1 .1q0 .1 0 .1c0 0 0 .1 0 .1c-.1 0-.1 .1-.1 .2q0 .1 0 .2q-.1-.1 0-.2q0-.1 0-.2c-.1 .1-.1 .2-.1 .3c0 0 0 .1 0 .2q-.1 0-.1 0h-.1c0 0-.1 .1-.3 .1c-.1 0-.2 0-.2 0c0 0-.1 .1-.1 .1q0 .1 0 .1v-.2l-.1 .2c0 0 0-.1 0-.1c0 0 0-.1-.1-.1q0 .2 0 .2v-.1c0 0 0-.1-.1-.1q0 .1 0 .2q.1 0 0 0c0 0-.1 0-.1 0c-.1 0-.2 0-.2-.1l-.1 .1H780c0 0 0-.1-.1-.1l-.1-.1c0 0 0 .1 0 .1q0 .1-.1 .1c0 0-.1-.1-.1-.2c-.1-.1-.1-.2-.2-.3c0 0 .1 0 .1 0c0-.3 0-.6 .1-.9c0-.3 .1-.7 .1-1l.1-.5c.1-.3 .1-.5 .1-.6c0-.1 0-.2 0-.3c.1-.1 .1-.2 .1-.3c0-.1 .1-.3 .1-.6l.2-.6c0 0 0-.1 0-.1c0 0 0-.1 0-.1c.1-.5 .2-.9 .4-1.4c.1-.6 .2-1.1 .2-1.6v-.1c.1 0 .1-.1 .1-.3c0 0 0-.1 0-.1c.1-.2 .1-.3 .3-.4c.1 0 .2-.1 .4-.3c.1 0 .2 0 .4 0c.2 0 .3 0 .4-.1c0 0 .1 .1 .1 .1h.1c.1 .1 .2 .2 .4 .3c.2 0 .3 .1 .4 .3c.1 .1 .1 .2 0 .4c0 .2-.1 .3-.1 .5c0 .2 0 .4-.1 .7c0 .2-.1 .4-.1 .7l.4-.3c.3-.3 .5-.5 .8-.6c.3-.1 .5-.3 .8-.5c.2 0 .3 0 .4-.1c0 0 .2 0 .4 0c.1 0 .2 0 .3 .2c0 0 .1 0 .2 0c.1 .1 .2 .1 .1 .3V36h-.1q0 .1 0 .1c0 0 0 .1 0 .1c0 0-.1 0-.2 0c0 0 0 .1 0 .1q-.1 0-.1 0q-.1 0-.2 0v.1c-.1-.1-.2-.1-.2-.1c0-.1-.1-.1-.2 0c0 0 .1 0 .1 0q.1 0 .1 .1c-.1 .1-.2 .2-.3 .2q-.1 .1-.2 .1c0 0 0-.1 0-.1l-.1 .1c0 0-.1 .1-.1 .1c0 0-.1 0-.1 .1q-.1 0-.1 0Zm-2 2.3c0 .1 0 .2 0 .2Z' class='g0'/%3E%0A%3Cpath d='M785.1 45.8q-.1-.1-.1-.2c.1 0 .1-.1 0-.2q.1 .1 .1 .2q0 .1 0 .2ZM785.2 45.4q.1 .1 .1 .1q-.1 .1-.1 .1q0-.1 0-.2Zm.2 1.2q-.1 0-.1-.1c0 0 0-.1-.1-.2c0 0 0-.1 0-.1Zm5.1-.3c.1-.1 .2-.2 .3-.3c.2-.1 .3-.2 .4-.3c-.1 0-.1 .1-.2 .2c-.1 .1-.2 .2-.3 .3l.1-.1l-.1 .2h-.1l-.1 .1q-.1 .1-.2 .1c-.1 .1-.2 .1-.3 .1c0 .1-.1 .1-.2 .1q0 .1 0 .1c-.1 .1-.2 .1-.3 .1c0 .1-.1 .1-.2 .1v.1h-.1c-.1 0-.2 0-.3 .1c-.1 0-.2 0-.3 .1c0 0-.1 0-.1 .1h-.1c-.2 0-.4 0-.5 0c-.2 .1-.4 .1-.5 0c-.1 0-.2 0-.2 0q-.1 0-.2 0c-.2 0-.3 0-.4 0c-.1 0-.2-.1-.3-.1l-.1-.1c0 0-.1 0 0 0c-.3-.1-.4-.2-.6-.3l.1-.1c-.1 0-.1-.1-.2-.2c0-.1-.1-.2-.1-.3c0 0-.1 0-.1-.1l.1 .1l-.1-.4c0-.1 0-.2 0-.3c0 0 0-.1 0-.3q.1-.1 .1-.2q0-.1 .1-.2q0-.1 0-.1c0-.1 0-.2 0-.3c0 0 .1-.1 .1-.1c.1-.2 .2-.3 .2-.4c.1-.1 .2-.2 .2-.3c.1-.1 .2-.2 .3-.3c0-.1 .1-.2 .2-.3h.1c.1-.2 .2-.3 .3-.4c.1-.2 .2-.3 .3-.4c0 0 .1 0 .1 0c0 0 .1-.1 .1-.1c0 0 0-.1 .1-.1c.2-.2 .4-.4 .7-.6l.6-.5h.1q0-.1 .1-.1c0 0 .1 0 .1-.1q0 .1-.1 .1l.1-.1c-.1 0 0 0 0 0l.2-.1v-.1h.1v-.1c-.1-.1-.1 0-.1 0h-.1l.1-.1c-.1-.2-.2-.3-.3-.5c-.1-.2-.3-.4-.4-.5c-.2-.3-.3-.5-.5-.7c-.2-.2-.4-.4-.5-.7c-.2-.2-.3-.4-.4-.7c-.1-.2-.2-.5-.2-.7c-.1-.2-.1-.4 0-.6c.1-.2 .1-.4 .2-.5q.1 0 .1-.1c.1-.1 .2-.2 .3-.2c.1-.1 .2-.2 .3-.3c.3-.3 .7-.5 1.1-.7c.4-.2 .9-.3 1.3-.5c.2 0 .3 0 .4 0c.1 0 .3 0 .4-.1c.1 0 .2 0 .3 0c.1 0 .2 0 .3 .1h.2c0 0 .1 0 .1 0c0 0 .1 0 .1 0h.1c.1 0 .2 0 .3 .1c0 0 .1 .1 .1 .1c.1 0 .2 .1 .3 .1q.1 .1 .2 .2c.1 .1 .2 .2 .2 .4c.1 .1 .1 .3 .1 .5c0 .1 0 .2-.1 .3c0 .2-.1 .3-.1 .4c-.1 .1-.1 .2-.1 .2c0 .1-.1 .1-.2 .2q-.1 0-.2 .1c-.1 0-.2 0-.2 .1c0 .1-.1 .1-.1 .1v.1c-.1 0-.2 0-.3 .1c-.2 0-.3 0-.4 0c0-.1-.1-.1-.2-.2c-.1 0-.1-.1-.1-.1c.3-.4 .4-.8 .3-1.2c.1-.1 0-.2 0-.2c-.1-.1-.1-.2-.3-.2q.1 0 0 0v-.1c-.1 0-.2-.1-.4 0c-.1 0-.3 0-.4 .1q-.1 0-.2 0q0 .1-.1 .2c-.2 .1-.3 .3-.5 .4c-.2 .2-.3 .4-.5 .6c-.2 .2-.2 .4-.1 .7c.1 .3 .2 .5 .3 .7l.6 .8l.1 .2c.2 .1 .3 .3 .5 .5c.1 .2 .2 .3 .3 .5q.1 0 .1 0h.1c.6-.3 1.2-.5 1.8-.7c.6-.2 1.3-.4 2.1-.5c0 0 .1-.1 .1-.1c.1 0 .2 0 .3 0c.1 0 .2 0 .3 0h.8c.2 0 .3 0 .4 0c.1 0 .2 0 .4 0v.1c0 0-.1 0-.1 0c0 0-.1 0-.1 .1h.1v.1c0 0-.1 0-.1 0c0 0 .1 0 .2 0c0 0 .1 0 .1 .1c-.1 0-.3 0-.4 0c-.1 0-.3 0-.4 0q0 .1 .1 .1c-.2 0-.4 0-.6 0c-.1 0-.2 .1-.3 .1q-.1 0-.1 0c0 .1 0 0 0 0c-.1 .1-.3 .1-.4 .1c-.1 0-.3 .1-.4 .2c.2 0 .4 0 .4-.1q0 .1-.1 .1q-.1 0-.2 0c0 0-.1 0-.1 .1h-.1c0 0-.1 0-.2 .1c-.1 0-.2 0-.2 .1c-.4 .1-.8 .2-1.2 .4c-.4 .1-.7 .3-1.1 .4q0 .1-.1 .1c0 0 0 .1-.1 .1h.1c0 0-.1 .1-.2 .1c-.1 0-.2 .1-.2 .1h.1h-.1c.2 .4 .4 .7 .5 1.1c.1 .4 .2 .8 .2 1.3c0-.1-.1-.1 0-.2c0-.1 0-.2 0-.2c-.1 .1-.1 .3 0 .5c0 .1 0 .3-.1 .5c0 0 0-.1 0-.2c-.1 0-.1 .1-.1 .1q0 .1 0 .2c0 0-.1 .1-.1 .1q0 .1 0 .2q-.1 0 0 0V44c-.1 0-.1 .1-.1 .1c0 0 0 .1 0 .2c0 0 0-.1-.1-.1l-.2 .6q.1-.1 .1-.2c0 0 0-.1 .1-.1c0 .1-.1 .2-.1 .3c0 .1-.1 .1-.1 .2q0 .1 0 .1l-.4 .4c0 0 .1 0 .1 0q-.1 .1-.2 .1l.4-.5c-.1 0-.1 .1-.2 .2c-.1 .1-.2 .2-.2 .3c-.1 .1-.2 .2-.3 .3c-.1 .1-.2 .2-.3 .2h.1q-.1 0-.1 0q0 .1 0 0c-.2 .1-.3 .2-.4 .3c-.2 .1-.3 .2-.4 .3l.3-.2c0 0 .1 0 .1 0c.1-.1 .2-.1 .3-.2Zm-4.3-2.9v.1q0-.1 0-.1Zm.5 2.5c0 0 .1 0 0-.1c0 0 0-.1 0-.1c.1 .1 .1 .2 .1 .3c.1 .1 .2 .2 .5 .3q0 .1 0 .1q0-.1 0 0c.2 .1 .3 .1 .4 .1c.1 0 .2 0 .4 0c.2 0 .4-.1 .6-.2c.1-.2 .3-.3 .5-.4c.1-.1 .2-.2 .2-.3c.1-.2 .2-.3 .3-.4v-.1c.2-.2 .3-.4 .3-.6c.1-.2 .2-.4 .2-.6v-.4q.1 0 .1-.1c0 .1 0 .2 0 .2c0 .1-.1 .1-.1 .2q.1 0 .1 .1c0-.1 0-.3 .1-.4c0-.2 0-.3 0-.5l-.1-.2c0 0 0-.1-.1-.2c0-.1 0-.2 0-.3c0 0 0-.1 0-.3c-.1-.1-.1-.2-.1-.4c0-.1-.1-.2-.1-.3c-.5 .3-1 .7-1.4 1.1c-.3 .3-.7 .7-1.1 1.2c0 0 0-.1-.1-.1c-.1 .1-.1 .2-.2 .2c0 .1-.1 .2-.1 .3l-.1 .2v-.1c-.1 .1-.2 .3-.2 .5c-.1 0-.1 .1-.1 .1c-.1 0-.1 .1 0 .1c0-.1 0-.2 .1-.2c0 .1 0 .2-.1 .2c-.1 .1-.1 .2-.1 .3h.1q-.1 0-.1 0q.1 0 .1 .1c0 0-.1 0-.1 0l.2 .4c-.1 0-.2-.1-.2-.2q0-.1 0-.2c-.1 0-.1 .1 0 .1l-.1 .1q0-.1 0-.1c0 .1 0 .2 .1 .3q0-.1 0-.1q-.1-.1 0-.1c0 .1 0 .2 0 .3c0 .1 0 .2 .1 .2Zm-.2-.7c.1 0 .1-.1 .1-.1q-.1 0-.1 0q0 .1 0 .1Zm.2 .5q-.1 0-.1 0q0-.1 .1-.1Zm0-.5c0 0 .1 0 .1 .1c0 0-.1 0-.1 0Zm.1-.8c0 0 .1 0 .1 .1c0 0-.1 0-.1 0Zm1.5-3.1q-.1 .1-.2 .1Zm.3-.3v.1q0-.1 0-.1Zm.4 0q0-.1 0-.1Zm.1-.2c0 0 .1 0 .1-.1c0 0 0 .1-.1 .1Zm.5 6.1c0 0-.1 0-.2 0c0 0-.1 0-.1 .1Zm.5-5.2c-.1 0-.1-.1-.1-.1q.1 0 .1 .1Zm.2 1.6v-.1Zm0 .1v-.1Zm.6 2.7c0-.1 .1-.1 .1-.2c0 0 .1 0 .2-.1Zm.4-.5v-.1Zm.2-.1c0 0-.1 .1-.2 .1c0 0 .1 0 .1-.1h.1Zm.1-.5q.1 0 .1-.1c0 0 0-.1 0-.1Zm.2-.1V45v-.1Zm.1-.5q.1 0 0 0c0 0 0 .1 0 .1q-.1-.1 0-.1ZM792.6 38.9c.2 0 .3 0 .4 0c.1-.1 .2-.1 .3-.2c.2 0 .4-.1 .6-.1c.2-.1 .4-.1 .7-.2c-.4 0-.7 .1-1 .2c-.4 .1-.7 .2-1 .3Z' class='g0'/%3E%0A%3Cpath d='M730.2 332.5v19.1H711.1V332.5m19.1 0v19.1h19V332.5m19.1 0v19.1h19V332.5m-19 0v19.1H749.2V332.5m57.2 0v19.1H787.3V332.5m19.1 0v19.1h19V332.5m19.1 0v19.1H825.4V332.5m-228.6 0v19.1h-19V332.5m19 0v19.1h19.1V332.5m19 0v19.1H654V332.5m-19.1 0v19.1h-19V332.5m57.1 0v19.1H654V332.5m19 0v19.1h19.1V332.5m19 0v19.1h-19V332.5' class='g2'/%3E%0A%3C/svg%3E"
        />
      </div>
      <div className="text-container">
        <span
          className="t m0 s0"
          style={{
            left: "855.7px",
            bottom: "981.1px",
            letterSpacing: "0.66px",
            wordSpacing: "-1.01px"
          }}
        >
          SECTION A{" "}
        </span>
        <span
          className="t m0 s0"
          style={{
            left: "855.7px",
            bottom: "806.9px",
            letterSpacing: "0.66px",
            wordSpacing: "-0.37px"
          }}
        >
          SECTION B{" "}
        </span>
        <span
          className="t m0 s0"
          style={{
            left: "855.7px",
            bottom: "342.7px",
            letterSpacing: "0.66px",
            wordSpacing: "-0.37px"
          }}
        >
          SECTION C{" "}
        </span>
        <span
          className="t s1"
          style={{ left: 347, bottom: 1095, letterSpacing: "-0.12px" }}
        >
          PLEASE FAX/SCAN PAGE 1 AND 2 ONLY{" "}
        </span>
        <span
          className="t s1"
          style={{ left: 242, bottom: 1079, letterSpacing: "-0.12px" }}
        >
          REQUEST FOR CASHLESS HOSPITALISATION FOR MEDICAL INSURANCE POLICY{" "}
        </span>
        <span
          className="t s2"
          style={{ left: 66, bottom: 1210, letterSpacing: "-0.16px" }}
        >
          Bajaj Allianz General Insurance Company Limited.{" "}
        </span>
        <span
          className="t s3"
          style={{ left: 66, bottom: 1198, letterSpacing: "-0.07px" }}
        >
          Regd. &amp; Head Office :{" "}
        </span>
        <span
          className="t s4"
          style={{
            left: 164,
            bottom: 1198,
            letterSpacing: "-0.09px",
            wordSpacing: "0.02px"
          }}
        >
          Bajaj Allianz House, Airport Road, Yerawada, Pune 411 006{" "}
        </span>
        <span
          className="t s4"
          style={{ left: 66, bottom: 1185, letterSpacing: "-0.08px" }}
        >
          CIN: U66010PN2000PLC015329{" "}
        </span>
        <span
          className="t s4"
          style={{
            left: 757,
            bottom: 1140,
            letterSpacing: "-0.11px",
            wordSpacing: "0.05px"
          }}
        >
          (To be filled in block letters){" "}
        </span>
        <span
          className="t s5"
          style={{ left: 64, bottom: 1059, letterSpacing: "0.13px" }}
        >
          DETAILS OF THE PROVIDER{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1032, letterSpacing: "-0.12px" }}
        >
          Hospital Name/nursing Home
          Name:____________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1007, letterSpacing: "-0.12px" }}
        >
          _________________________________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 983, letterSpacing: "-0.12px" }}
        >
          City Name:______________________________________________________ Pin
          Code:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 958, letterSpacing: "-0.12px" }}
        >
          State Name:_____________________________________________________ Hosp
          Id:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 933, letterSpacing: "-0.12px" }}
        >
          Landmark:_______________________________________________________Rohini
          ID{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 908, letterSpacing: "-0.11px" }}
        >
          Hospital Contact No: ________________{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 294,
            bottom: 908,
            letterSpacing: "-0.13px",
            wordSpacing: "0.02px"
          }}
        >
          Fax No: ____________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 423, bottom: 908, letterSpacing: "-0.12px" }}
        >
          TPA desk No __________Email id: __________________________________{" "}
        </span>
        <span
          className="t s5"
          style={{ left: 64, bottom: 865, letterSpacing: "0.13px" }}
        >
          TO BE FILLED BY THE INSURED/PATIENT{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 842, letterSpacing: "-0.12px" }}
        >
          a) Name of the Patient:
          _______________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 817, letterSpacing: "-0.09px" }}
        >
          b) Current{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 125, bottom: 817, letterSpacing: "-0.12px" }}
        >
          Address of lnsured
          patient:___________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 793, letterSpacing: "-0.12px" }}
        >
          _________________________________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 776, letterSpacing: "-0.1px" }}
        >
          c) Gender: Male{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 182, bottom: 776, letterSpacing: "-0.13px" }}
        >
          Female{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 257, bottom: 776, letterSpacing: "-0.09px" }}
        >
          d) Age:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 301, bottom: 776, letterSpacing: "-0.43px" }}
        >
          Years{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 382, bottom: 776, letterSpacing: "-0.11px" }}
        >
          Months{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 487, bottom: 776, letterSpacing: "-0.09px" }}
        >
          e) Date of birth:{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 751,
            letterSpacing: "-0.12px",
            wordSpacing: "0.01px"
          }}
        >
          f) Name of the Attendant:__________________________________g) Contact
          number, if any:{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 727,
            letterSpacing: "-0.06px",
            wordSpacing: "-0.04px"
          }}
        >
          h) Contact number:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 389, bottom: 727, letterSpacing: "-0.09px" }}
        >
          i) Insured card ID number:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 702, letterSpacing: "-0.05px" }}
        >
          j){" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 702, letterSpacing: "-0.1px" }}
        >
          Occupation{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 145, bottom: 702, letterSpacing: "-0.11px" }}
        >
          of Insured patient:________________________k) Policy number I Name of
          corporate:_________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 677, letterSpacing: "-0.09px" }}
        >
          l) Employee ID:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 652, letterSpacing: "-0.1px" }}
        >
          m) Currently do you have any other Mediclaim / Health insurance:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 444, bottom: 652, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 492, bottom: 652, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 628, letterSpacing: "-0.13px" }}
        >
          Company
          Name:__________________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 603, letterSpacing: "-0.12px" }}
        >
          Give
          details:______________________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 578, letterSpacing: "-0.09px" }}
        >
          n) Do you have a family physician:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 270, bottom: 578, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 321, bottom: 578, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 342, bottom: 578, letterSpacing: "-0.11px" }}
        >
          o) Name of the family
          physician:______________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 553,
            letterSpacing: "-0.13px",
            wordSpacing: "0.03px"
          }}
        >
          p)Contact number, if any:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 529, letterSpacing: "-0.11px" }}
        >
          q) Insured E-mail id_____________________________________
        </span>
        <span
          className="t s7"
          style={{ left: 423, bottom: 529, letterSpacing: "-0.12px" }}
        >
          (PLEASE COMPLETE DECLARATION ON THE REVERSE SIDE OF THIS FORM){" "}
        </span>
        <span
          className="t s5"
          style={{ left: 64, bottom: 502, letterSpacing: "0.13px" }}
        >
          TO BE FILLED BY THE TREATING DOCTOR / HOSPITAL{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 478, letterSpacing: "-0.09px" }}
        >
          a) Name of the treating doctor:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 235, bottom: 478, letterSpacing: "-0.12px" }}
        >
          ____________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 543, bottom: 478, letterSpacing: "-0.1px" }}
        >
          b) Contact number:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 454, letterSpacing: "-0.11px" }}
        >
          c) Nature of ILLNESS / Disease with presenting
          complaints____________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 429, letterSpacing: "-0.12px" }}
        >
          d) Relevant clinical
          findings:___________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 404, letterSpacing: "-0.09px" }}
        >
          e) Duration of the present ailment:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 311, bottom: 404, letterSpacing: "-0.09px" }}
        >
          Days{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 345, bottom: 404, letterSpacing: "-0.08px" }}
        >
          i. Date of first consultation:{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 79,
            bottom: 379,
            letterSpacing: "-0.09px",
            wordSpacing: "0.01px"
          }}
        >
          i. Past history of present{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 211, bottom: 379, letterSpacing: "-0.12px" }}
        >
          ailment if
          any:________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 355,
            letterSpacing: "-0.11px",
            wordSpacing: "-0.01px"
          }}
        >
          f) Provisional
          diagnosis________________________________________________________i.
          ICD 10 Code:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 330, letterSpacing: "-0.09px" }}
        >
          g) Proposed line of treatment:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 249, bottom: 330, letterSpacing: "-0.11px" }}
        >
          Medical Management{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 439, bottom: 330, letterSpacing: "-0.11px" }}
        >
          Surgical Management{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 671, bottom: 330, letterSpacing: "-0.09px" }}
        >
          Intensive care{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 249, bottom: 305, letterSpacing: "-0.09px" }}
        >
          Investigation{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 439, bottom: 305, letterSpacing: "-0.1px" }}
        >
          Non allopathic treatment{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 280,
            letterSpacing: "-0.11px",
            wordSpacing: "0.11px"
          }}
        >
          h) If Investigation &amp; I or Medical Management provide details
          _________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 79, bottom: 256, letterSpacing: "-0.12px" }}
        >
          i) Route of drug
          administration:______________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 79, bottom: 231, letterSpacing: "-0.13px" }}
        >
          _______________________________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 206, letterSpacing: "1.72px" }}
        >
          i){" "}
        </span>
        <span
          className="t s6"
          style={{ left: 80, bottom: 206, letterSpacing: "-0.09px" }}
        >
          If Surgical, name of{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 188, bottom: 206, letterSpacing: "-0.11px" }}
        >
          surgery:_____________________________________________ i. ICD 10 PCS
          Code:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 181, letterSpacing: "-0.11px" }}
        >
          j) If other treatments provide
          details:_____________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 157, letterSpacing: "-0.12px" }}
        >
          k) How did injury
          occur:______________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 132, letterSpacing: "-0.08px" }}
        >
          I) In case of accident:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 181, bottom: 132, letterSpacing: "-0.07px" }}
        >
          i. Is it RTA:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 262, bottom: 132, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 307, bottom: 132, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 394, bottom: 132, letterSpacing: "-0.08px" }}
        >
          ii. Date of injury:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 74, bottom: 107, letterSpacing: "-0.08px" }}
        >
          iii. Reported to Police:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 213, bottom: 107, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 258, bottom: 107, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 394,
            bottom: 107,
            letterSpacing: "-0.13px",
            wordSpacing: "0.05px"
          }}
        >
          iv. FIR No .{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 82, letterSpacing: "-0.46px" }}
        >
          v.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 90, bottom: 82, letterSpacing: "-0.1px" }}
        >
          Injury/Disease caused due to substance abuse/alcohol consumption:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 485, bottom: 82, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 535, bottom: 82, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 76,
            bottom: 58,
            letterSpacing: "-0.14px",
            wordSpacing: "0.05px"
          }}
        >
          vi. Test conducted to establish this{" "}
        </span>
        <span className="t s6" style={{ left: 262, bottom: 58 }}>
          :{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 290, bottom: 58, letterSpacing: "-0.77px" }}
        >
          Yes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 338, bottom: 58, letterSpacing: "-0.09px" }}
        >
          No{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 379,
            bottom: 58,
            letterSpacing: "-0.16px",
            wordSpacing: "0.07px"
          }}
        >
          (If Yes attach reports){" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 33, letterSpacing: "-0.09px" }}
        >
          I) In case of Maternity:{" "}
        </span>
        <span className="t s6" style={{ left: 198, bottom: 33 }}>
          G{" "}
        </span>
        <span className="t s6" style={{ left: 237, bottom: 33 }}>
          P{" "}
        </span>
        <span className="t s6" style={{ left: 274, bottom: 33 }}>
          L{" "}
        </span>
        <span className="t s6" style={{ left: 310, bottom: 33 }}>
          A{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 347, bottom: 33, letterSpacing: "-0.09px" }}
        >
          Expected date of Delivery:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 657, bottom: 33, letterSpacing: "-0.09px" }}
        >
          LMP:{" "}
        </span>
        <span className="t s8" style={{ left: 580, bottom: 774 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 600, bottom: 774 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 624, bottom: 774 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 643, bottom: 774 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 669, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 688, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 707, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 726, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 341, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 360, bottom: 774 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 430, bottom: 774 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 450, bottom: 774 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 497, bottom: 405 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 517, bottom: 405 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 540, bottom: 405 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 560, bottom: 405 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 586, bottom: 405 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 605, bottom: 405 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 624, bottom: 405 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 643, bottom: 405 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 486, bottom: 129 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 506, bottom: 129 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 529, bottom: 129 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 549, bottom: 129 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 575, bottom: 129 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 594, bottom: 129 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 613, bottom: 129 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 632, bottom: 129 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 492, bottom: 32 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 512, bottom: 32 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 536, bottom: 32 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 555, bottom: 32 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 582, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 601, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 620, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 638, bottom: 32 }}>
          Y{" "}
        </span>
        <span
          className="t s9"
          style={{ left: 392, bottom: 1114, letterSpacing: "0.18px" }}
        >
          CASHLESS FORM{" "}
        </span>
        <span
          className="t s3"
          style={{
            left: 63,
            bottom: 1159,
            letterSpacing: "-0.12px",
            wordSpacing: "0.05px"
          }}
        >
          Health Administration Team :{" "}
        </span>
        <span
          className="t s4"
          style={{
            left: 200,
            bottom: 1159,
            letterSpacing: "-0.08px",
            wordSpacing: "0.01px"
          }}
        >
          *A - Wing 2nd Floor, Bajaj Finserv Building, Behind Weikfield IT Park,
          Off Nagar Road, Viman Nagar | Pune - 411 014{" "}
        </span>
        <span
          className="t s3"
          style={{ left: 63, bottom: 1146, letterSpacing: "-0.08px" }}
        >
          Phone No.:{" "}
        </span>
        <span
          className="t s4"
          style={{
            left: 115,
            bottom: 1146,
            letterSpacing: "-0.08px",
            wordSpacing: "0.01px"
          }}
        >
          020-30305858/ 1800-103-2529 Fax: 020-30512224/ 6/ 7{" "}
        </span>
        <span className="t s4" style={{ left: 374, bottom: 1146 }}>
          |{" "}
        </span>
        <span
          className="t s3"
          style={{ left: 381, bottom: 1146, letterSpacing: "-0.07px" }}
        >
          Email:{" "}
        </span>
        <span
          className="t s4"
          style={{ left: 411, bottom: 1146, letterSpacing: "-0.07px" }}
        >
          preauth@bajajallianz.co.in{" "}
        </span>
        <span className="t s8" style={{ left: 691, bottom: 32 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 711, bottom: 32 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 735, bottom: 32 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 754, bottom: 32 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 780, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 799, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 818, bottom: 32 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 837, bottom: 32 }}>
          Y{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 570, bottom: 13, letterSpacing: "-0.08px" }}
        >
          CIN: U66010PN2000PLC015329{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 715, bottom: 13, letterSpacing: "-0.08px" }}
        >
          | UIN: BAJHLIP19087V011819{" "}
        </span>
      </div>
    </div>
  </div>
  <div className="page-container">
    <div className="page" style={{ width: 909, height: 1286 }}>
      <div
        id="pg2Overlay"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0)",
          WebkitUserSelect: "none"
        }}
      />
      <div id="pg2" style={{ WebkitUserSelect: "none" }}>
        <img
          id="pdf2"
          style={{ width: 909, height: 1286 }}
          src="data:image/svg+xml,%3Csvg viewBox='0 0 909 1286' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%0A%3Cdefs%3E%0A%3Cstyle%3E%0A.g0%7Bfill:none%3Bstroke:%23231F20%3Bstroke-width:0.763%3Bstroke-miterlimit:22%3B%7D%0A.g1%7Bfill:%23231F20%3B%7D%0A.g2%7Bfill:%23FFF%3B%7D%0A%3C/style%3E%0A%3C/defs%3E%0A%3Cpath d='M427.9 201.4v19H408.8v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H446.9v-19m95.2 0v19h-19v-19m-19.1 0v19H485v-19m19 0v19h19.1v-19M293.2 128.9v19h-19v-19m19 0v19h19.1v-19m19 0v19h-19v-19M190.8 80.6V99.7h19V80.6m19.1 0V99.7H209.8V80.6m25.1 0V99.7H254V80.6m19 0V99.7H254V80.6m25.1 0V99.7h19V80.6m19.1 0V99.7H298.1V80.6m125.9 0V99.7h19V80.6m19.1 0V99.7H443V80.6m25.1 0V99.7h19.1V80.6m19 0V99.7h-19V80.6m-35.8 48.3v19h85.7v-19m-85.7 19v-19h85.7v19M427.9 225.4v19H408.8v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H446.9v-19m95.2 0v19h-19v-19m-19.1 0v19H485v-19m19 0v19h19.1v-19m-95.2 24.2v19.1H408.8V249.6m19.1 0v19.1h19V249.6m19.1 0v19.1h19V249.6m-19 0v19.1H446.9V249.6m95.2 0v19.1h-19V249.6m-19.1 0v19.1H485V249.6m19 0v19.1h19.1V249.6m-95.2 24.3V293H408.8V273.9m19.1 0V293h19V273.9m19.1 0V293h19V273.9m-19 0V293H446.9V273.9m95.2 0V293h-19V273.9m-19.1 0V293H485V273.9m19 0V293h19.1V273.9m-95.2 24.3v19H408.8v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H446.9v-19m95.2 0v19h-19v-19m-19.1 0v19H485v-19m19 0v19h19.1v-19m-95.2 50.4v19H408.8v-19m19.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H446.9v-19m95.2 0v19h-19v-19m-19.1 0v19H485v-19m19 0v19h19.1v-19m-95.2 73.7v19.1H408.8V422.3m19.1 0v19.1h19V422.3m19.1 0v19.1h19V422.3m-19 0v19.1H446.9V422.3m95.2 0v19.1h-19V422.3m-19.1 0v19.1H485V422.3m19 0v19.1h19.1V422.3m-95.2 24.6V466H408.8V446.9m19.1 0V466h19V446.9m19.1 0V466h19V446.9m-19 0V466H446.9V446.9m95.2 0V466h-19V446.9m-19.1 0V466H485V446.9m19 0V466h19.1V446.9M762.2 80.6V99.7h19.1V80.6m19 0V99.7h-19V80.6m25.1 0V99.7h19V80.6m19.1 0V99.7H825.4V80.6M762.2 102v19h19.1V102m19 0v19h-19V102m25.1 0v19h19V102m19.1 0v19H825.4V102m-63.2 22.5v19h19.1v-19m19 0v19h-19v-19m25.1 0v19h19v-19m19.1 0v19H825.4v-19M762.2 148v19.1h19.1V148m19 0v19.1h-19V148m25.1 0v19.1h19V148m19.1 0v19.1H825.4V148m-63.2 25.4v19.1h19.1V173.4m19 0v19.1h-19V173.4m25.1 0v19.1h19V173.4m19.1 0v19.1H825.4V173.4m-63.2 25.1v19h19.1v-19m19 0v19h-19v-19m25.1 0v19h19v-19m19.1 0v19H825.4v-19m-63.2 25v19h19.1v-19m19 0v19h-19v-19m25.1 0v19h19v-19m19.1 0v19H825.4v-19m-63.2 25v19.1h19.1V248.5m19 0v19.1h-19V248.5m25.1 0v19.1h19V248.5m19.1 0v19.1H825.4V248.5m-63.2 25v19.1h19.1V273.5m19 0v19.1h-19V273.5m25.1 0v19.1h19V273.5m19.1 0v19.1H825.4V273.5M556.8 84.3v19.1h19V84.3m-19 21.3v19.1h19V105.6m-19 22.6v19h19v-19m-19 23.5v19h19v-19m-19 25.4v19h19v-19m-19 25v19.1h19V202.1m-19 25.1v19h19v-19m-19 25v19h19v-19m-19 25v19.1h19V277.2m-25-235.1V444.3m103 123v19h-19v-19m19 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H672.8v-19m95.3 0v19H749v-19m-19 0v19H710.9v-19m19.1 0v19h19v-19m95.3 0v19H825.2v-19m-57.1 0v19h19v-19m19.1 0v19h19v-19m-19 0v19H787.1v-19M84.6 599v69.9H351V599M84.6 668.9V599H351v69.9M557.5 599v69.9H823.8V599M557.5 668.9V599H823.8v69.9M390 103.7v19H370.9v-19m104.9 0v19h-19v-19' class='g0'/%3E%0A%3Cpath fill-rule='evenodd' d='M866.1 40.9h12.3V1220H866.1Z' class='g1'/%3E%0A%3Cpath fill-rule='evenodd' d='M866.1 55.4h12.3V161.9H866.1Z' class='g2'/%3E%0A%3Cpath d='M554.9 347.8H842.6M554.9 373.3H842.6M248.3 154.7v19H229.2v-19m19.1 0v19h19v-19m19.1 0v19H267.3v-19M427.9 398.5v19.1H408.8V398.5m19.1 0v19.1h19V398.5m19.1 0v19.1h19V398.5m-19 0v19.1H446.9V398.5m95.2 0v19.1h-19V398.5m-19.1 0v19.1H485V398.5m19 0v19.1h19.1V398.5' class='g0'/%3E%0A%3C/svg%3E"
        />
      </div>
      <div className="text-container">
        <span
          className="t s5"
          style={{ left: 64, bottom: 1225, letterSpacing: "0.12px" }}
        >
          Details of the patient admitted{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1186, letterSpacing: "-0.09px" }}
        >
          a) Date of admission:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 375, bottom: 1186, letterSpacing: "-0.09px" }}
        >
          b) Time:{" "}
        </span>
        <span className="t s6" style={{ left: 464, bottom: 1186 }}>
          :{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1186, letterSpacing: "-0.09px" }}
        >
          Diabetes{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1161, letterSpacing: "-0.1px" }}
        >
          c) Is this an emergency/a planned hospitalization event?:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 394, bottom: 1161, letterSpacing: "-0.11px" }}
        >
          Emergency{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 477, bottom: 1161, letterSpacing: "-0.1px" }}
        >
          Planned{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1161, letterSpacing: "-0.1px" }}
        >
          Heart Disease{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1137, letterSpacing: "-0.09px" }}
        >
          d) Expected no. of days stay in hospital:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 333, bottom: 1137, letterSpacing: "-0.09px" }}
        >
          Days{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 375,
            bottom: 1137,
            letterSpacing: "-0.26px",
            wordSpacing: "0.15px"
          }}
        >
          e) Room Type{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1137, letterSpacing: "-0.11px" }}
        >
          Hypertension{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 1112,
            letterSpacing: "-0.07px",
            wordSpacing: "-0.02px"
          }}
        >
          f) Expected no.of days in ICU{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 295, bottom: 1112, letterSpacing: "-0.09px" }}
        >
          Days{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1112, letterSpacing: "-0.11px" }}
        >
          Hyperlipidemia{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1087, letterSpacing: "-0.1px" }}
        >
          g) Per Day Room Rent + Nursing &amp;{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1087, letterSpacing: "-0.09px" }}
        >
          Osteoarthritis{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 1062, letterSpacing: "-0.1px" }}
        >
          Service Charges + Patient's Diet:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 1062, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1062, letterSpacing: "-0.1px" }}
        >
          Asthma / COPD / Bronchitis{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1038, letterSpacing: "-0.09px" }}
        >
          h) Expected cost for investigation + diagnostics.:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 1038, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1038, letterSpacing: "-0.1px" }}
        >
          Cancer{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1013, letterSpacing: "-0.09px" }}
        >
          i) ICU Charges:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 1013, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1013, letterSpacing: "-0.09px" }}
        >
          Alcohol or drug{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 666, bottom: 1013, letterSpacing: "-0.1px" }}
        >
          abuse{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 988, letterSpacing: "-0.09px" }}
        >
          j) OT Charges:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 988, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 988, letterSpacing: "-0.1px" }}
        >
          Any HIV or STD / Related ailments{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 963, letterSpacing: "-0.1px" }}
        >
          k) Professional fees Surgeon + Anesthetist Fees +{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 963, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 963, letterSpacing: "-0.1px" }}
        >
          Any other Ailment give details:_______________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 75, bottom: 939, letterSpacing: "-0.1px" }}
        >
          consultation Charges{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 914, letterSpacing: "-0.1px" }}
        >
          l) Medicines + Consumables + Cost of Implants{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 392, bottom: 914, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 889, letterSpacing: "-0.08px" }}
        >
          specify).{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 77, bottom: 864, letterSpacing: "-0.09px" }}
        >
          Other hospital expenses if any:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 864, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 840, letterSpacing: "-0.09px" }}
        >
          m) All inclusive package charges if any applicable{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 840, letterSpacing: "-0.09px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 815,
            letterSpacing: "-0.13px",
            wordSpacing: "0.04px"
          }}
        >
          n) Sum Total expected cost of hospitalization{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 815, letterSpacing: "-0.07px" }}
        >
          Rs.{" "}
        </span>
        <span
          className="t s7"
          style={{ left: 655, bottom: 790, letterSpacing: "-0.12px" }}
        >
          (PLEASE READ VERY CAREFULLY){" "}
        </span>
        <span
          className="t s5"
          style={{
            left: 557,
            bottom: 1225,
            letterSpacing: "0.11px",
            wordSpacing: "0.01px"
          }}
        >
          Mandatory: Past History of any{" "}
        </span>
        <span
          className="t s5"
          style={{ left: 557, bottom: 1207, letterSpacing: "0.1px" }}
        >
          chronic illness{" "}
        </span>
        <span
          className="t s5"
          style={{ left: 667, bottom: 1207, letterSpacing: "0.11px" }}
        >
          (If yes, since (month / year){" "}
        </span>
        <span
          className="t s2"
          style={{ left: 64, bottom: 765, letterSpacing: "0.15px" }}
        >
          DECLARATION{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 747,
            letterSpacing: "-0.11px",
            wordSpacing: "0.01px"
          }}
        >
          We confirm having read understood and agreed to the Declarations on
          the reverse of this form{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 723, letterSpacing: "-0.12px" }}
        >
          a) Name of the treating
          doctor:_________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 698, letterSpacing: "-0.11px" }}
        >
          b) Qualification:_________________________________________c)
          Registration No. with State Code:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 101, bottom: 592, letterSpacing: "-0.09px" }}
        >
          Hospital Seal (Must include Hospital ID){" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 615,
            bottom: 592,
            letterSpacing: "-0.11px",
            wordSpacing: "0.01px"
          }}
        >
          Patient Insured Name &amp; Signature{" "}
        </span>
        <span className="t s8" style={{ left: 196, bottom: 1185 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 216, bottom: 1185 }}>
          D{" "}
        </span>
        <span className="t s8" style={{ left: 240, bottom: 1185 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 259, bottom: 1185 }}>
          M{" "}
        </span>
        <span className="t s8" style={{ left: 286, bottom: 1185 }}>
          Y{" "}
        </span>
        <span className="t s8" style={{ left: 304, bottom: 1185 }}>
          Y{" "}
        </span>
        <span className="t sb" style={{ left: 429, bottom: 1185 }}>
          H{" "}
        </span>
        <span className="t sb" style={{ left: 448, bottom: 1185 }}>
          H{" "}
        </span>
        <span className="t sb" style={{ left: 470, bottom: 1185 }}>
          M{" "}
        </span>
        <span className="t sb" style={{ left: 492, bottom: 1185 }}>
          M{" "}
        </span>
        <span
          className="t m0 s0"
          style={{
            left: 863,
            bottom: "1207.8px",
            letterSpacing: "0.66px",
            wordSpacing: "-0.37px"
          }}
        >
          SECTION D{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 572, bottom: 13, letterSpacing: "-0.08px" }}
        >
          CIN: U66010PN2000PLC015329{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 716, bottom: 13, letterSpacing: "-0.08px" }}
        >
          | UIN: BAJHLIP19087V011819{" "}
        </span>
      </div>
    </div>
  </div>
  <div className="page-container">
    <div className="page" style={{ width: 909, height: 1286 }}>
      <div
        id="pg3Overlay"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0)",
          WebkitUserSelect: "none"
        }}
      />
      <div id="pg3" style={{ WebkitUserSelect: "none" }}>
        <img
          id="pdf3"
          style={{ width: 909, height: 1286 }}
          src="data:image/svg+xml,%3Csvg viewBox='0 0 909 1286' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%0A%3Cdefs%3E%0A%3Cstyle%3E%0A.g0%7Bfill:none%3Bstroke:%23231F20%3Bstroke-width:0.763%3Bstroke-miterlimit:22%3B%7D%0A.g1%7Bfill:none%3Bstroke:%23231F20%3Bstroke-width:0.866%3Bstroke-miterlimit:22%3B%7D%0A%3C/style%3E%0A%3C/defs%3E%0A%3Cpath d='M183.9 464.8v19H203v-19m19 0v19H203v-19m19 0v19h19.1v-19m19 0v19h-19v-19m19 0v19h19.1v-19m19 0v19h-19v-19m19 0v19h19.1v-19m19 0v19h-19v-19m19 0v19h19.1v-19m19 0v19h-19v-19' class='g0'/%3E%0A%3Cpath d='M532.2 489.4H845.5v69.9H532.2Zm0 575.9H845.5v69.9H532.2Zm-469.3 0H376.1v69.9H62.9Z' class='g1'/%3E%0A%3C/svg%3E"
        />
      </div>
      <div className="text-container">
        <span
          className="t s7"
          style={{ left: 349, bottom: 1224, letterSpacing: "-0.12px" }}
        >
          PAGE 3: NOT TO BE FAXED/SCANNED{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1199, letterSpacing: "-0.11px" }}
        >
          DECLARATION BY THE PATIENT / REPRESENTATIVE{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1174, letterSpacing: "-0.06px" }}
        >
          A.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 80, bottom: 1174, letterSpacing: "-0.09px" }}
        >
          I agree to allow the hospital to submit all original documents
          pertaining to hospitalization to the Bajaj Allianz General Insurance
          Company{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1158, letterSpacing: "-0.1px" }}
        >
          Limited after the discharge. I agree to sign on the Final Bill &amp;
          the Discharge Summary, before my discharge.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1133, letterSpacing: "-0.06px" }}
        >
          B.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 80, bottom: 1133, letterSpacing: "-0.1px" }}
        >
          Payment to hospital is governed by the terms and conditions of the
          policy. In case the Bajaj Allianz General Insurance Company Limited is
          not{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1116, letterSpacing: "-0.09px" }}
        >
          liable to settle the hospital bill, I undertake to settle the bill as
          per the terms and conditions of the policy.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1092, letterSpacing: "-0.06px" }}
        >
          C.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1092, letterSpacing: "-0.06px" }}
        >
          All{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 100, bottom: 1092, letterSpacing: "-0.1px" }}
        >
          non-medical{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 174, bottom: 1092, letterSpacing: "-0.1px" }}
        >
          expenses{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 230, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          and{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 256, bottom: 1092, letterSpacing: "-0.1px" }}
        >
          expenses{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 311, bottom: 1092, letterSpacing: "-0.08px" }}
        >
          not{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 335, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          relevant{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 384, bottom: 1092, letterSpacing: "-0.07px" }}
        >
          to{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 400, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          current{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 445, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          hospitalization{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 529, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          and{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 555, bottom: 1092, letterSpacing: "-0.08px" }}
        >
          the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 1092, letterSpacing: "-0.11px" }}
        >
          amounts{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 631, bottom: 1092, letterSpacing: "-0.09px" }}
        >
          over{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 660, bottom: 1092, letterSpacing: "-0.1px" }}
        >
          &amp; above the limit authorized by{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1075, letterSpacing: "-0.1px" }}
        >
          the Bajaj Allianz General Insurance Company Limited not governed by
          the terms and conditions of the policy will be paid by me.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1050, letterSpacing: "-0.06px" }}
        >
          D .{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1050, letterSpacing: "-0.09px" }}
        >
          I hereby declare to abide by the terms and conditions of the policy
          and if at any time the facts disclosed by me are found to be false or
          incorrect{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 1034, letterSpacing: "-0.1px" }}
        >
          I forfeit my claim and agree to indemnify the Bajaj Allianz General
          Insurance Company Limited{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1009, letterSpacing: "-0.05px" }}
        >
          E .{" "}
        </span>
        <span className="t s6" style={{ left: 81, bottom: 1009 }}>
          I{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 90, bottom: 1009, letterSpacing: "-0.09px" }}
        >
          agree{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 126, bottom: 1009, letterSpacing: "-0.09px" }}
        >
          and{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 152, bottom: 1009, letterSpacing: "-0.1px" }}
        >
          understand{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 219, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          that{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 246, bottom: 1009, letterSpacing: "-0.1px" }}
        >
          Bajaj Allianz General Insurance Company Limited{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 514, bottom: 1009, letterSpacing: "-0.05px" }}
        >
          is{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 528, bottom: 1009, letterSpacing: "-0.06px" }}
        >
          in{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 543, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          no{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 563, bottom: 1009, letterSpacing: "-0.1px" }}
        >
          way warranting{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 652, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 675, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          service{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 717, bottom: 1009, letterSpacing: "-0.07px" }}
        >
          of{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 734, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 757, bottom: 1009, letterSpacing: "-0.09px" }}
        >
          hospital{" "}
        </span>
        <span className="t s6" style={{ left: 804, bottom: 1009 }}>
          &amp;{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 820, bottom: 1009, letterSpacing: "-0.08px" }}
        >
          that{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 993, letterSpacing: "-0.09px" }}
        >
          the Bajaj Allianz General Insurance Company Limited is in no way
          guaranteeing that the services provided by the hospital will be of a
          particular{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 976, letterSpacing: "-0.09px" }}
        >
          quality or standard.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 951, letterSpacing: "-0.05px" }}
        >
          F .{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 951, letterSpacing: "-0.09px" }}
        >
          I hereby warrant the truth of the forgoing particulars in every
          respect and I agree that if I have made or shall make any false or
          untrue{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 935, letterSpacing: "-0.1px" }}
        >
          statement suppression or concealment with respect to the claim, my
          right to claim reimbursement of the said expenses shall be absolutely{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 918, letterSpacing: "-0.09px" }}
        >
          forfeited.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 894, letterSpacing: "-0.06px" }}
        >
          G .{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 894, letterSpacing: "-0.1px" }}
        >
          I agree to indemnify the hospital against all expenses incurred on my
          behalf, which are not reimbursed by the Bajaj Allianz General
          Insurance{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 81, bottom: 877, letterSpacing: "-0.12px" }}
        >
          Company Limited{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 852, letterSpacing: "-0.04px" }}
        >
          I.{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 81,
            bottom: 852,
            letterSpacing: "-0.13px",
            wordSpacing: "0.03px"
          }}
        >
          I/We authorize{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 167, bottom: 852, letterSpacing: "-0.1px" }}
        >
          Insurance{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 225, bottom: 852, letterSpacing: "-0.12px" }}
        >
          Company/TPA{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 308, bottom: 852, letterSpacing: "-0.1px" }}
        >
          to contact me/us{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 405, bottom: 852, letterSpacing: "-0.1px" }}
        >
          through{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 454, bottom: 852, letterSpacing: "-0.1px" }}
        >
          mobile/email{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 532, bottom: 852, letterSpacing: "-0.09px" }}
        >
          for any update{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 615, bottom: 852, letterSpacing: "-0.1px" }}
        >
          on this claim{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 828, letterSpacing: "-0.12px" }}
        >
          a) Patient's /Insured's Name:
          __________________________________________________________________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 803, letterSpacing: "-0.1px" }}
        >
          b) Contact number:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 803, letterSpacing: "-0.09px" }}
        >
          c) Patient's / Insured's Signature:{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 778, letterSpacing: "-0.11px" }}
        >
          d) Email ID (optional)_________________________________{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 729, letterSpacing: "-0.11px" }}
        >
          Date - _________________ Time - _____{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 679, letterSpacing: "-0.12px" }}
        >
          HOSPITAL DECLARATION{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 654, letterSpacing: "-0.06px" }}
        >
          1.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 654, letterSpacing: "-0.1px" }}
        >
          We have no objection to any authorized Bajaj Allianz General Insurance
          Company Limited official verifying documents pertaining to{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 638, letterSpacing: "-0.09px" }}
        >
          hospitalization.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 613, letterSpacing: "-0.06px" }}
        >
          2.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 613, letterSpacing: "-0.09px" }}
        >
          All valid original documents duty countersigned by the insured I
          patient as per the checklist below will be sent to Bajaj Allianz
          General{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 597, letterSpacing: "-0.1px" }}
        >
          Insurance Company Limited within 7 days of the patient's discharge.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 572, letterSpacing: "-0.06px" }}
        >
          3.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 572, letterSpacing: "-0.11px" }}
        >
          WE AGREE THAT BAJAJ ALLIANZ GENERAL INSURANCE COMPANY LIMITED WILL NOT
          BE LIABLE TO MAKE THE PAYMENT IN THE EVENT OF ANY{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 555, letterSpacing: "-0.12px" }}
        >
          DISCREPANCY BETWEEN THE FACTS IN THIS FORM AND DISCHARGE SUMMARY or
          other documents.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 531, letterSpacing: "-0.06px" }}
        >
          4.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 531, letterSpacing: "-0.1px" }}
        >
          The patient declaration has been signed by the patient or by his
          representative in our presence.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 506, letterSpacing: "-0.06px" }}
        >
          5.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 506, letterSpacing: "-0.1px" }}
        >
          We agree to provide clarifications for the queries raised regarding
          this hospitalization and we take the sole responsibility for any delay
          in{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 489, letterSpacing: "-0.09px" }}
        >
          offering clarifications.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 465, letterSpacing: "-0.06px" }}
        >
          6.{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 89,
            bottom: 465,
            letterSpacing: "-0.11px",
            wordSpacing: "0.01px"
          }}
        >
          We will abide by the terms and conditions agreed in the MOU.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 440, letterSpacing: "-0.06px" }}
        >
          7.{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 89,
            bottom: 440,
            letterSpacing: "-0.16px",
            wordSpacing: "0.05px"
          }}
        >
          We confirm{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 158, bottom: 440, letterSpacing: "-0.1px" }}
        >
          that no additional amount would be collected{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 407, bottom: 440, letterSpacing: "-0.09px" }}
        >
          liom{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 437, bottom: 440, letterSpacing: "-0.09px" }}
        >
          the insured{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 503, bottom: 440, letterSpacing: "-0.1px" }}
        >
          in excess of Agreed Package Rates except costs{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 759, bottom: 440, letterSpacing: "-0.1px" }}
        >
          towards{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 807, bottom: 440, letterSpacing: "-0.12px" }}
        >
          non-{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 423, letterSpacing: "-0.09px" }}
        >
          admissible{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 152, bottom: 423, letterSpacing: "-0.11px" }}
        >
          amounts{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 205, bottom: 423, letterSpacing: "-0.09px" }}
        >
          (including{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 266, bottom: 423, letterSpacing: "-0.09px" }}
        >
          additional charges{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 369, bottom: 423, letterSpacing: "-0.09px" }}
        >
          due{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 396, bottom: 423, letterSpacing: "-0.1px" }}
        >
          to opting higher room rent{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 545, bottom: 423, letterSpacing: "-0.09px" }}
        >
          than eligibility choosing{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 677, bottom: 423, letterSpacing: "-0.09px" }}
        >
          separate{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 728, bottom: 423, letterSpacing: "-0.09px" }}
        >
          line of treatment{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 407, letterSpacing: "-0.1px" }}
        >
          which{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 127, bottom: 407, letterSpacing: "-0.1px" }}
        >
          is not envisaged/considered{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 283, bottom: 407, letterSpacing: "-0.1px" }}
        >
          in package).{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 382, letterSpacing: "-0.06px" }}
        >
          8.{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 89,
            bottom: 382,
            letterSpacing: "-0.16px",
            wordSpacing: "0.05px"
          }}
        >
          We confirm{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 158, bottom: 382, letterSpacing: "-0.09px" }}
        >
          that no{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 202, bottom: 382, letterSpacing: "-0.09px" }}
        >
          recoveries{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 262, bottom: 382, letterSpacing: "-0.1px" }}
        >
          would{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 301, bottom: 382, letterSpacing: "-0.11px" }}
        >
          be made from{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 383, bottom: 382, letterSpacing: "-0.09px" }}
        >
          the deposit{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 449, bottom: 382, letterSpacing: "-0.11px" }}
        >
          amount{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 497, bottom: 382, letterSpacing: "-0.09px" }}
        >
          collected from{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 580, bottom: 382, letterSpacing: "-0.09px" }}
        >
          the insured{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 646, bottom: 382, letterSpacing: "-0.09px" }}
        >
          except{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 688, bottom: 382, letterSpacing: "-0.09px" }}
        >
          for costs towards{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 784, bottom: 382, letterSpacing: "-0.12px" }}
        >
          non-{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 366, letterSpacing: "-0.1px" }}
        >
          admissible amounts (including{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 260, bottom: 366, letterSpacing: "-0.09px" }}
        >
          additional{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 319, bottom: 366, letterSpacing: "-0.1px" }}
        >
          charges{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 367, bottom: 366, letterSpacing: "-0.09px" }}
        >
          due{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 393, bottom: 366, letterSpacing: "-0.1px" }}
        >
          to opting higher room{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 517, bottom: 366, letterSpacing: "-0.09px" }}
        >
          rent than eligibility/choosing{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 676, bottom: 366, letterSpacing: "-0.09px" }}
        >
          separate{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 728, bottom: 366, letterSpacing: "-0.09px" }}
        >
          line of treatment{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 349, letterSpacing: "-0.1px" }}
        >
          which{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 127, bottom: 349, letterSpacing: "-0.1px" }}
        >
          is not envisaged/considered{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 283, bottom: 349, letterSpacing: "-0.1px" }}
        >
          in package).{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 324, letterSpacing: "-0.06px" }}
        >
          9.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 324, letterSpacing: "-0.06px" }}
        >
          In{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 105, bottom: 324, letterSpacing: "-0.1px" }}
        >
          the event of unauthorized{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 249, bottom: 324, letterSpacing: "-0.09px" }}
        >
          recovery{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 301, bottom: 324, letterSpacing: "-0.1px" }}
        >
          of any additional amount{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 440, bottom: 324, letterSpacing: "-0.1px" }}
        >
          from the Insured{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 536, bottom: 324, letterSpacing: "-0.09px" }}
        >
          in excess of Agreed{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 645, bottom: 324, letterSpacing: "-0.12px" }}
        >
          Package{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 694, bottom: 324, letterSpacing: "-0.1px" }}
        >
          Rates, the authorized TPA{" "}
        </span>
        <span className="t s6" style={{ left: 836, bottom: 324 }}>
          /{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 308, letterSpacing: "-0.1px" }}
        >
          Insurance{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 147, bottom: 308, letterSpacing: "-0.12px" }}
        >
          Company{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 205, bottom: 308, letterSpacing: "-0.09px" }}
        >
          reserves{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 254, bottom: 308, letterSpacing: "-0.08px" }}
        >
          the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 278, bottom: 308, letterSpacing: "-0.08px" }}
        >
          right{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 309, bottom: 308, letterSpacing: "-0.07px" }}
        >
          to{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 325, bottom: 308, letterSpacing: "-0.09px" }}
        >
          recover the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 391, bottom: 308, letterSpacing: "-0.1px" }}
        >
          same from us (the Network Provider){" "}
        </span>
        <span
          className="t s6"
          style={{ left: 596, bottom: 308, letterSpacing: "-0.09px" }}
        >
          and,/or take{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 666, bottom: 308, letterSpacing: "-0.1px" }}
        >
          necessary{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 724, bottom: 308, letterSpacing: "-0.08px" }}
        >
          action,{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 765, bottom: 308, letterSpacing: "-0.09px" }}
        >
          as provided{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 291, letterSpacing: "-0.1px" }}
        >
          under{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 127, bottom: 291, letterSpacing: "-0.1px" }}
        >
          the MOU or applicable{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 252, bottom: 291, letterSpacing: "-0.11px" }}
        >
          laws{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 89, bottom: 242, letterSpacing: "-0.09px" }}
        >
          Hospital Seal{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 578, bottom: 242, letterSpacing: "-0.1px" }}
        >
          Doctor's Signature{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 572, bottom: 13, letterSpacing: "-0.08px" }}
        >
          CIN: U66010PN2000PLC015329{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 717, bottom: 13, letterSpacing: "-0.08px" }}
        >
          | UIN: BAJHLIP19087V011819{" "}
        </span>
        <span
          className="t sc"
          style={{ left: 520, bottom: 121, letterSpacing: "-0.08px" }}
        >
          Date-________________{" "}
        </span>
        <span
          className="t sc"
          style={{ left: 634, bottom: 121, letterSpacing: "-0.08px" }}
        >
          Time - ___________________{" "}
        </span>
      </div>
    </div>
  </div>
  <div className="page-container">
    <div className="page" style={{ width: 909, height: 1286 }}>
      <div
        id="pg4Overlay"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0)",
          WebkitUserSelect: "none"
        }}
      />
      <div id="pg4" style={{ WebkitUserSelect: "none" }}>
        <img
          id="pdf4"
          style={{ width: 909, height: 1286 }}
          src="data:image/svg+xml,%3Csvg viewBox='0 0 909 1286' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%0A%3Cdefs%3E%0A%3C/defs%3E%0A%3C/svg%3E"
        />
      </div>
      <div className="text-container">
        <span
          className="t s7"
          style={{ left: 64, bottom: 1199, letterSpacing: "-0.12px" }}
        >
          DOCUMENTS TO BE PROVIDED BY THE HOSPITAL IN SUPPORT OF THE CLAIM{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1174, letterSpacing: "-0.1px" }}
        >
          1. Detailed Discharge Summary and all Bills from the hospital{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1149, letterSpacing: "-0.1px" }}
        >
          2. Cash Memos from the Hospitals / Chemists supported by proper
          prescription.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1125, letterSpacing: "-0.09px" }}
        >
          3. Receipts{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 127, bottom: 1125, letterSpacing: "-0.09px" }}
        >
          and{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 153,
            bottom: 1125,
            letterSpacing: "-0.17px",
            wordSpacing: "0.07px"
          }}
        >
          Pathological Test Reports{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 291, bottom: 1125, letterSpacing: "-0.1px" }}
        >
          from{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 323, bottom: 1125, letterSpacing: "-0.1px" }}
        >
          Pathologists,{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 396, bottom: 1125, letterSpacing: "-0.1px" }}
        >
          supported{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 456, bottom: 1125, letterSpacing: "-0.08px" }}
        >
          by{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 475, bottom: 1125, letterSpacing: "-0.09px" }}
        >
          note{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 505, bottom: 1125, letterSpacing: "-0.1px" }}
        >
          from{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 537, bottom: 1125, letterSpacing: "-0.08px" }}
        >
          the{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 560, bottom: 1125, letterSpacing: "-0.09px" }}
        >
          attending{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 618, bottom: 1125, letterSpacing: "-0.09px" }}
        >
          Medical Practitioner I{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 736, bottom: 1125, letterSpacing: "-0.1px" }}
        >
          Surgeon{" "}
        </span>
        <span
          className="t s6"
          style={{
            left: 64,
            bottom: 1108,
            letterSpacing: "-0.15px",
            wordSpacing: "0.05px"
          }}
        >
          recommending such pathological Tests.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1083, letterSpacing: "-0.1px" }}
        >
          4. Surgeon's Certificate stating nature of operation performed and
          Surgeon's Bill and Receipt.{" "}
        </span>
        <span
          className="t s6"
          style={{ left: 64, bottom: 1059, letterSpacing: "-0.09px" }}
        >
          5. Certificates from attending Medical Practitioner / Surgeon that the
          patient is fully cured.{" "}
        </span>
        <span
          className="t sd"
          style={{
            left: 64,
            bottom: 1044,
            letterSpacing: "0.06px",
            wordSpacing: "0.01px"
          }}
        >
          *As per IRDA circular Ref: IRDA/SDD/GDL/CIR/020/02/2013 Anti-Money
          Laundering /Counter Financing of Terrorism (AML/CFT)-Guidelines for
          General Insurers All general insurance companies are required to carry
          out{" "}
        </span>
        <span
          className="t sd"
          style={{ left: 64, bottom: 1033, letterSpacing: "0.06px" }}
        >
          KYC norms at the settlement stage where claim payout crosses a
          threshold of ` One lakh per claim. In cases where payments are made to
          third party service providers such as hospitals, the KYC norms shall
          apply on the{" "}
        </span>
        <span
          className="t sd"
          style={{ left: 64, bottom: 1022, letterSpacing: "0.07px" }}
        >
          customers on whose behalf service providers act.{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 572, bottom: 13, letterSpacing: "-0.08px" }}
        >
          CIN: U66010PN2000PLC015329{" "}
        </span>
        <span
          className="t sa"
          style={{ left: 717, bottom: 13, letterSpacing: "-0.08px" }}
        >
          | UIN: BAJHLIP19087V011819{" "}
        </span>
      </div>
    </div>
  </div>
</>

  );
};

export default BajajForm;
