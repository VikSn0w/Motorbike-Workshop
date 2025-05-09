import {
  require_db,
  require_node
} from "/build/_shared/chunk-VALUHWKX.js";
import {
  Link,
  useLoaderData
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

// app/routes/appointments.tsx
var import_node = __toESM(require_node(), 1);
var import_db = __toESM(require_db(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/appointments.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/appointments.tsx"
  );
  import.meta.hot.lastModified = "1746611468795.3467";
}
function AppointmentList() {
  _s();
  const {
    appointments
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-3xl mx-auto mt-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Appointments" }, void 0, false, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 45,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/appointments/new", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "+ New Appointment" }, void 0, false, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 46,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/appointments.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-4", children: appointments.map((appt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "border p-4 rounded shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "font-semibold", children: [
        appt.customer,
        " \u2014 ",
        appt.bikeModel
      ] }, void 0, true, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 53,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-600", children: [
        appt.service,
        " on",
        " ",
        new Date(appt.date).toLocaleString(void 0, {
          dateStyle: "medium",
          timeStyle: "short"
        })
      ] }, void 0, true, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 54,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500", children: [
        "Phone: ",
        appt.phone
      ] }, void 0, true, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 61,
        columnNumber: 25
      }, this),
      appt.mechanic && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-green-600", children: [
        "Assigned to: ",
        appt.mechanic.name
      ] }, void 0, true, {
        fileName: "app/routes/appointments.tsx",
        lineNumber: 62,
        columnNumber: 43
      }, this)
    ] }, appt.id, true, {
      fileName: "app/routes/appointments.tsx",
      lineNumber: 52,
      columnNumber: 43
    }, this)) }, void 0, false, {
      fileName: "app/routes/appointments.tsx",
      lineNumber: 51,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/appointments.tsx",
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
_s(AppointmentList, "bs0SKIQt2LgTupjsKHP8Tq/LNew=", false, function() {
  return [useLoaderData];
});
_c = AppointmentList;
var _c;
$RefreshReg$(_c, "AppointmentList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AppointmentList as default
};
//# sourceMappingURL=/build/routes/appointments-QGZXVTO2.js.map
