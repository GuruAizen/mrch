
        // {/* ADDRESS OF INSURED PATIENT */}
        // {renderParagraph(data?.address || "", 414, 160, 585, 40)}

        // {/* NAME OF TREATING DOCTOR */}
        // {renderCharByCharWithGaps(
        //   data?.nameOfTreatingDoctor || "",
        //   485,
        //   171,
        //   [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* CONTACT NO */}
        // {renderCharByCharWithGaps(
        //   data?.contactNo || "",
        //   485,
        //   600,
        //   [15, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* NAME OF ILLNESS / DISEASE WITH PRESENTING COMPLAINTS */}
        // {renderParagraph(
        //   data?.natureOfIllnessWithPresentingComplaints || "",
        //   525,
        //   49,
        //   338,
        //   38
        // )}

        // {/* RELEVANT CLINICAL FINDINGS */}
        // {renderParagraph(
        //   data?.relevantClinicalFindings || "",
        //   525,
        //   403,
        //   340,
        //   38
        // )}

        // {/* DURATION OF PRESENT AILMENT */}
        // {renderParagraph(data?.presentAilmentDuration || "", 575, 175, 55, 14)}

        // {/* DATE OF FIRST CONSULTATION DD MM YYYY */}
        // <EraseArea top={575} left={380} width={10} height={14} />
        // <EraseArea top={575} left={395} width={10} height={14} />
        // <EraseArea top={575} left={410} width={10} height={14} />
        // <EraseArea top={575} left={426} width={10} height={14} />
        // <EraseArea top={575} left={441} width={10} height={14} />
        // <EraseArea top={575} left={456} width={10} height={14} />
        // <EraseArea top={575} left={472} width={10} height={14} />
        // <EraseArea top={575} left={487} width={10} height={14} />
        // {renderSingleCharByChar(
        //   parseDOBtoDDMMYYYY(data?.dateOfBirth || ""),
        //   574,
        //   381,
        //   dobGaps
        // )}

        // {/* PAST HISTORY OF PRESENT AILMENT */}
        // {renderParagraph(
        //   data?.pastHistoryPresentIllness || "",
        //   600,
        //   197,
        //   548,
        //   20
        // )}

        // {/* PROVISIONAL DIAGNOSIS */}
        // {renderParagraph(
        //   data?.pastHistoryPresentIllness || "",
        //   637,
        //   50,
        //   540,
        //   37
        // )}

        // {/* ICD 10 CODE */}
        // {renderCharByCharWithGaps(
        //   data?.icd10Code || "",
        //   637,
        //   599,
        //   [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* PROPOSED LINE OF TREATMENT */}
        // {proposedLineOfTreatmentFn("medical management") && (
        //   <Tick top={685} left={170}>
        //     ✔
        //   </Tick>
        // )}
        // {proposedLineOfTreatmentFn("surgical management") && (
        //   <Tick top={685} left={289}>
        //     ✔
        //   </Tick>
        // )}
        // {proposedLineOfTreatmentFn("intensivecare") && (
        //   <Tick top={685} left={399}>
        //     ✔
        //   </Tick>
        // )}
        // {proposedLineOfTreatmentFn("investigation") && (
        //   <Tick top={685} left={497}>
        //     ✔
        //   </Tick>
        // )}
        // {proposedLineOfTreatmentFn("non-allopathic treatment") && (
        //   <Tick top={685} left={583.5}>
        //     ✔
        //   </Tick>
        // )}

        // {/* INVESTIGATION / MEDICAL MANAGEMENT */}
        // {renderParagraph(
        //   data?.ifInvestigativeOfMedicalManagementProvideDetails || "",
        //   724,
        //   48,
        //   340,
        //   42
        // )}

        // {/* ROUTE OF DRUG ADMINISTRATION */}
        // {routeOfDrugAdministrationFn("iv medication") ? (
        //   <Tick top={724} left={398.5}>
        //     ✔
        //   </Tick>
        // ) : routeOfDrugAdministrationFn("oral medication") ? (
        //   <Tick top={724} left={431.5}>
        //     ✔
        //   </Tick>
        // ) : (
        //   <>
        //     <Tick top={724} left={470.5}>
        //       ✔
        //     </Tick>
        //     {renderParagraph(
        //       safeUpper(data?.routeOfDrugAdministration || ""),
        //       724,
        //       513,
        //       233,
        //       42
        //     )}
        //   </>
        // )}

        // {/* IF SURGICAL NAME OF SURGERY */}
        // {renderParagraph(data?.surgicalNameOfSurgery || "", 788, 50, 540, 38)}

        // {/* ICD 10 PCS CODE */}
        // {renderCharByCharWithGaps(
        //   data?.icd10PcsCode || "",
        //   789,
        //   599,
        //   [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* IF OTHER TREATMENT PROVIDE DETAILS */}
        // {renderParagraph(data?.ifOtherTreatmentDetails || "", 851, 50, 338, 38)}

        // {/* HOW DID INJURY OCCUR */}
        // {renderParagraph(data?.howDidInjuryOccur || "", 853, 402, 342, 36)}

        // {/* IN CASE OF ACCIDENT */}
        // {normalizeString(data?.isItRta) === "yes" && (
        //   <Tick top={900} left={178}>
        //     ✔
        //   </Tick>
        // )}
        // {normalizeString(data?.isItRta) === "no" && (
        //   <Tick top={900} left={207.5}>
        //     ✔
        //   </Tick>
        // )}

        // {/* DATE OF INJURY DD MM YYYY */}
        // <EraseArea top={900} left={308.5} width={10} height={14} />
        // <EraseArea top={900} left={324} width={10} height={14} />
        // <EraseArea top={900} left={339} width={10} height={14} />
        // <EraseArea top={900} left={354.5} width={10} height={14} />
        // <EraseArea top={900} left={370} width={10} height={14} />
        // <EraseArea top={900} left={385} width={10} height={14} />
        // <EraseArea top={900} left={400.5} width={10} height={14} />
        // <EraseArea top={900} left={415.5} width={10} height={14} />
        // {renderCharByCharWithGaps(
        //   parseDOBtoDDMMYYYY(data?.dateOfInjury || ""),
        //   898,
        //   310,
        //   [16, 16, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* REPORTED TO POLICE */}
        // {normalizeString(data?.reportedToPolice) === "yes" && (
        //   <Tick top={897} left={528.9}>
        //     ✔
        //   </Tick>
        // )}
        // {normalizeString(data?.reportedToPolice) === "no" && (
        //   <Tick top={897} left={558.9}>
        //     ✔
        //   </Tick>
        // )}

        // {/* FIR NO */}
        // {renderCharByCharWithGaps(
        //   data?.firNo || "",
        //   898,
        //   645,
        //   [16, 15, 15, 14, 15, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* INJURY / DISEASE CAUSED DUE TO */}
        // {normalizeString(data?.injuryDueToAlcoholConsumption) === "yes" && (
        //   <Tick top={925} left={330.5}>
        //     ✔
        //   </Tick>
        // )}
        // {normalizeString(data?.injuryDueToAlcoholConsumption) === "no" && (
        //   <Tick top={925} left={300.5}>
        //     ✔
        //   </Tick>
        // )}

        // {/* TEST CONDUCTED TO ESTABLISH */}
        // {normalizeString(data?.testsConductedToEstablish) === "yes" && (
        //   <Tick top={925} left={603.5}>
        //     ✔
        //   </Tick>
        // )}
        // {normalizeString(data?.testsConductedToEstablish) === "no" && (
        //   <Tick top={925} left={634}>
        //     ✔
        //   </Tick>
        // )}

        // {/* IN CASE OF MATERNITY */}
        // {renderCharByCharWithGaps(data?.maternityG || "", 953, 160, [16])}
        // {renderCharByCharWithGaps(data?.maternityP || "", 953, 250, [16])}
        // {renderCharByCharWithGaps(data?.maternityL || "", 953, 340, [16])}
        // {renderCharByCharWithGaps(data?.maternityA || "", 953, 430, [16])}

        // {/* EXPECTED DATE OF DELIVERY DD MM YYYY */}
        // <EraseArea top={954} left={628} width={10} height={14} />
        // <EraseArea top={954} left={643.5} width={10} height={14} />
        // <EraseArea top={954} left={659} width={10} height={14} />
        // <EraseArea top={954} left={674} width={10} height={14} />
        // <EraseArea top={954} left={689} width={10} height={14} />
        // <EraseArea top={954} left={705} width={10} height={14} />
        // <EraseArea top={954} left={720} width={10} height={14} />
        // <EraseArea top={954} left={735} width={10} height={14} />
        // {renderCharByCharWithGaps(
        //   parseDOBtoDDMMYYYY(data?.expectedDateOfDelivery || ""),
        //   954,
        //   629,
        //   [16, 16, 15, 14, 16, 16, 15, 16, 15, 16, 15, 14, 15]
        // )}

        // {/* DATE OF ADMISSION DD MM YYYY */}
        // <EraseArea top={1003} left={128.5} width={10} height={14} />
        // <EraseArea top={1003} left={144.5} width={10} height={14} />
        // <EraseArea top={1003} left={159.5} width={10} height={14} />
        // <EraseArea top={1003} left={174.5} width={10} height={14} />
        // <EraseArea top={1003} left={190} width={10} height={14} />
        // <EraseArea top={1003} left={205} width={10} height={14} />
        // <EraseArea top={1003} left={221} width={10} height={14} />
        // <EraseArea top={1003} left={236.5} width={10} height={14} />
        // {renderCharByCharWithGaps(
        //   parseDOBtoDDMMYYYY(data?.dateOfAdmission || ""),
        //   1002,
        //   129,
        //   [16, 16, 15, 15, 16, 16, 16, 14, 15, 16, 15, 14, 15]
        // )}

        // {/* TIME OF ADMISSION HH MM */}
        // <EraseArea top={1003} left={345} width={10} height={14} />
        // <EraseArea top={1003} left={360} width={10} height={14} />
        // <EraseArea top={1003} left={375} width={10} height={14} />
        // <EraseArea top={1003} left={390} width={10} height={14} />
        // {renderCharByCharWithGaps(
        //   parseTimeToHHMM(data?.dateAndTimeOfAdmission || ""),
        //   1002,
        //   345,
        //   [16, 16, 15, 15]
        // )}

        // {/* THIS IS AN EMERGENCY PLANNED HOSPITAL EVENT */}
        // {isEmergencyType("an emergency") && (
        //   <Tick top={1000} left={451}>
        //     ✔
        //   </Tick>
        // )}
        // {isEmergencyType("a planned hospitalization event") && (
        //   <Tick top={1000} left={527}>
        //     ✔
        //   </Tick>
        // )}

        // {/* EXPECTED NO OF DAYS IN HOSPITAL */}
        // {renderParagraph(
        //   data?.expectedNoOfDaysStayInHospital || "",
        //   1027,
        //   190,
        //   55,
        //   14
        // )}

        // {/* DAYS IN ICU */}
        // {renderParagraph(data?.daysInIcu || "", 1027, 344, 57, 16)}

        // {/* ROOM TYPE */}
        // {renderParagraph(data?.roomType || "", 1026, 526, 220, 16)}
        // {/* PER DAY ROOM RENT */}
        // {renderNumberRightAligned(
        //   data?.perDayRoomRentNursingServiceCharges || "",
        //   102,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* EXPECTED COST */}
        // {renderNumberRightAligned(
        //   data?.expectedCostForInvestigationDiagnostics || "",
        //   123,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* ICU CHARGES */}
        // {renderNumberRightAligned(
        //   data?.icuCharges || "",
        //   144,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* OT CHARGES */}
        // {renderNumberRightAligned(
        //   data?.otCharges || "",
        //   165,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* PROFESSIONAL FEE CHARGES */}
        // {renderNumberRightAligned(
        //   data?.professionalFeesSurgeonAnesthetistFeesConsultationCharges || "",
        //   186,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* MEDICINES + CONSUMABLE */}
        // {renderNumberRightAligned(
        //   data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
        //     "",
        //   206,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* OTHER HOSPITAL */}
        // {renderNumberRightAligned(
        //   data?.medicinesConsumablesCostOfImplantsIfApplicablePleaseSpecify ||
        //     "",
        //   228,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* ALL INCLUSIVE PACKAGE */}
        // {renderNumberRightAligned(
        //   data?.allInclusivePackageChargesIfAnyApplicable || "",
        //   248,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}
        // {/* SUM TOTAL EXPECTED */}
        // {renderNumberRightAligned(
        //   data?.sumTotalExpectedCostOfHospitalization || "",
        //   269,
        //   338,
        //   [15, 16, 15, 16, 15, 15, 15]
        // )}

        // {/* DIABETES */}
        // <EraseArea top={122} left={684} width={10} height={12} />
        // <EraseArea top={122} left={699} width={10} height={12} />
        // <EraseArea top={122} left={720} width={10} height={12} />
        // <EraseArea top={122} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.diabetesSinceTf || "", 120, 462)}
        // {renderMonthYearWithGaps(data?.diabetesSince || "", 120, 684, [16, 21])}

        // {/* HEART DISEASE */}
        // <EraseArea top={144} left={684} width={10} height={12} />
        // <EraseArea top={144} left={699} width={10} height={12} />
        // <EraseArea top={144} left={720} width={10} height={12} />
        // <EraseArea top={144} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.heartDiseaseSinceTf || "", 141, 462)}
        // {renderMonthYearWithGaps(
        //   data?.heartDiseaseSince || "",
        //   142,
        //   684,
        //   [16, 21]
        // )}

        // {/* HYPERTENSION */}
        // <EraseArea top={165} left={684} width={10} height={12} />
        // <EraseArea top={165} left={700} width={10} height={12} />
        // <EraseArea top={165} left={720} width={10} height={12} />
        // <EraseArea top={165} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.hypertensionSinceTf || "", 162, 462)}
        // {renderMonthYearWithGaps(
        //   data?.hypertensionSince || "",
        //   163,
        //   685,
        //   [16, 20]
        // )}

        // {/* HYPERLIPIDEMIAS */}
        // <EraseArea top={185} left={684} width={10} height={12} />
        // <EraseArea top={185} left={699} width={10} height={12} />
        // <EraseArea top={185} left={720} width={10} height={12} />
        // <EraseArea top={185} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.hyperlipidemiasSinceTf || "", 183, 462)}
        // {renderMonthYearWithGaps(
        //   data?.hyperlipidemiasSince || "",
        //   184,
        //   684,
        //   [16, 21]
        // )}

        // {/* OSTEOARTHRITIS */}
        // <EraseArea top={206} left={684} width={10} height={12} />
        // <EraseArea top={206} left={700} width={10} height={12} />
        // <EraseArea top={206} left={720} width={10} height={12} />
        // <EraseArea top={206} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.osteoarthritisSinceTf || "", 204, 462)}
        // {renderMonthYearWithGaps(
        //   data?.osteoarthritisSince || "",
        //   204,
        //   684,
        //   [16, 21]
        // )}

        // {/* ASTHMA / COPD / BRONCHITIS */}
        // <EraseArea top={227} left={684} width={10} height={12} />
        // <EraseArea top={227} left={699} width={10} height={12} />
        // <EraseArea top={227} left={720} width={10} height={12} />
        // <EraseArea top={227} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.asthmaCopdBronchitisSinceTf || "", 224, 462)}
        // {renderMonthYearWithGaps(
        //   data?.asthmaCopdBronchitisSince || "",
        //   226,
        //   684,
        //   [16, 21]
        // )}

        // {/* CANCER */}
        // <EraseArea top={249} left={684} width={10} height={12} />
        // <EraseArea top={249} left={699} width={10} height={12} />
        // <EraseArea top={249} left={720} width={10} height={12} />
        // <EraseArea top={249} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.cancerSinceTf || "", 246, 462)}
        // {renderMonthYearWithGaps(data?.cancerSince || "", 247, 684, [16, 21])}

        // {/* ALCOHOL OR DRUG ABUSE */}
        // <EraseArea top={269} left={684} width={10} height={12} />
        // <EraseArea top={269} left={699} width={10} height={12} />
        // <EraseArea top={269} left={720} width={10} height={12} />
        // <EraseArea top={269} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.alcoholDrugabuseSinceTf || "", 267, 462)}
        // {renderMonthYearWithGaps(
        //   data?.alcoholDrugabuseSince || "",
        //   267,
        //   684,
        //   [16, 21]
        // )}

        // {/* ANY HIV */}
        // <EraseArea top={289} left={684} width={10} height={12} />
        // <EraseArea top={289} left={699} width={10} height={12} />
        // <EraseArea top={289} left={720} width={10} height={12} />
        // <EraseArea top={289} left={735} width={10} height={12} />
        // {renderCheckboxTick(data?.hivstdSinceTf || "", 287, 462)}
        // {renderMonthYearWithGaps(data?.hivstdSince || "", 287, 684, [16, 21])}

        // {/* ANY OTHER AILMENT DETAILS */}
        // {renderParagraph(
        //   shouldShowNoOtherAilments()
        //     ? "No other ailments"
        //     : data?.anyOtherailmentRemarks || "No other ailments",
        //   327,
        //   478,
        //   264,
        //   36
        // )}
