import {
  require_db,
  require_node
} from "/build/_shared/chunk-VALUHWKX.js";
import {
  Form,
  useActionData
} from "/build/_shared/chunk-ISUCW2IA.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-OY7DZL2Z.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/appointments_.new.tsx
var import_node = __toESM(require_node(), 1);
var import_db = __toESM(require_db(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/appointments_.new.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/appointments_.new.tsx"
  );
  import.meta.hot.lastModified = "1746612663830.6743";
}
function NewAppointment() {
  _s();
  const actionData = useActionData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-xl mx-auto mt-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold mb-4", children: "New Appointment" }, void 0, false, {
      fileName: "app/routes/appointments_.new.tsx",
      lineNumber: 63,
      columnNumber: 13
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 text-red-600", children: actionData.error }, void 0, false, {
      fileName: "app/routes/appointments_.new.tsx",
      lineNumber: 64,
      columnNumber: 35
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-medium", children: "Service" }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 67,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "service", className: "w-full border p-2 rounded", required: true, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select a service" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 69,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Oil Change", children: "Oil Change" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 70,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Tire Replacement", children: "Tire Replacement" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 71,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "General Inspection", children: "General Inspection" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 72,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Brake Check", children: "Brake Check" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 73,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Chain Adjustment", children: "Chain Adjustment" }, void 0, false, {
            fileName: "app/routes/appointments_.new.tsx",
            lineNumber: 74,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 68,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 66,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-medium", children: "Customer Name" }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 78,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "customer", type: "text", className: "w-full border p-2 rounded", required: true }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 79,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 77,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-medium", children: "Phone" }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 82,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "phone", type: "text", className: "w-full border p-2 rounded", required: true }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 83,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 81,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-medium", children: "Bike Model" }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 86,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "bikeModel", type: "text", className: "w-full border p-2 rounded", required: true }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 87,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 85,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block font-medium", children: "Date & Time" }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 90,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { name: "date", type: "datetime-local", className: "w-full border p-2 rounded", required: true }, void 0, false, {
          fileName: "app/routes/appointments_.new.tsx",
          lineNumber: 91,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 89,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Create Appointment" }, void 0, false, {
        fileName: "app/routes/appointments_.new.tsx",
        lineNumber: 93,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/appointments_.new.tsx",
      lineNumber: 65,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/appointments_.new.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
_s(NewAppointment, "fHVw5pq0Zwd2gXh2gyrnVdHnLCc=", false, function() {
  return [useActionData];
});
_c = NewAppointment;
var _c;
$RefreshReg$(_c, "NewAppointment");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  NewAppointment as default
};
//# sourceMappingURL=/build/routes/appointments_.new-IUR3IFEG.js.map
