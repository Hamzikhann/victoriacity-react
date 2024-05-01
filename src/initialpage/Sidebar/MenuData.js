export const sideMenu = [
  {
    title: "Main",
    menu: false,
    path: "",
    icon: "",
    child: [],
  },
  {
    title: "Dashboard",
    menu: true,
    icon: "la la-dashboard",
    path: "/app/main/dashboard",
    child: [],
  },
  {
    title: "Employee Management",
    menu: true,
    icon: "la la-user",
    path: "#",
    child: [
      {
        title: "All Employees",
        menu: false,
        icon: "",
        path: "/app/employee/allemployees",
        child: [],
      },
      {
        title: "Leaves",
        menu: false,
        icon: "",
        path: "/app/employee/leaves-admin",
        child: [],
      },
      {
        title: "Attendance",
        menu: false,
        icon: "",
        path: "/app/employee/attendance-admin",
        child: [],
      },
      {
        title: "Departments",
        menu: false,
        icon: "",
        path: "/app/employee/departments",
        child: [],
      },
      {
        title: "Designations",
        menu: false,
        icon: "",
        path: "/app/employee/designations",
        child: [],
      },
    ],
  },
  {
    title: "Project Management",
    menu: true,
    icon: "la la-procedures",
    path: "#",
    child: [
      {
        title: "Clients",
        menu: false,
        icon: "",
        path: "/app/employees/clients",
        child: [],
      },
      {
        title: "Projects",
        menu: false,
        icon: "",
        path: "/app/projects/project_dashboard",
        child: [],
      },
    ],
  },
  {
    title: "Administration",
    menu: false,
    path: "",
    icon: "",
    child: [],
  },
  {
    title: "System Management",
    menu: true,
    icon: "la la-user-plus",
    path: "#",
    child: [
      {
        title: "Users",
        menu: false,
        icon: "",
        path: "/app/administrator/users",
        child: [],
      },
      {
        title: "Groups",
        menu: false,
        icon: "",
        path: "/app/administrator/groups",
        child: [],
      },
    ],
  },
  {
    title: "Member Management",
    menu: true,
    icon: "la la-user",
    path: "#",
    child: [
      {
        title: "Member",
        menu: false,
        icon: "",
        path: "/app/administrator/members",
        child: [],
      },
      {
        title: "Nominee",
        menu: false,
        icon: "",
        path: "/app/administrator/nominee",
        child: [],
      },
    ],
  },
  {
    title: "Inventory Management",
    menu: true,
    icon: "la la-ticket",
    path: "#",
    child: [
      {
        title: "Unit",
        menu: false,
        icon: "",
        path: "/app/administrator/unit",
        child: [],
      },
      {
        title: "Block",
        menu: false,
        icon: "",
        path: "/app/administrator/block",
        child: [],
      },
      {
        title: "Plot",
        menu: false,
        icon: "",
        path: "/app/administrator/plot",
        child: [],
      },
      {
        title: "Payment Plan",
        menu: false,
        icon: "",
        path: "/app/administrator/paymentPlan",
        child: [],
      },
      {
        title: " Payment Mode",
        menu: false,
        icon: "",
        path: "/app/administrator/paymentMode",
        child: [],
      },
      {
        title: "  Installment Type",
        menu: false,
        icon: "",
        path: "/app/administrator/installmentType",
        child: [],
      },
      {
        title: " Phase",
        menu: false,
        icon: "",
        path: "/app/administrator/phase",
        child: [],
      },
      {
        title: " Sector",
        menu: false,
        icon: "",
        path: "/app/administrator/sector",
        child: [],
      },
      {
        title: " Unit Nature Type",
        menu: false,
        icon: "",
        path: "/app/administrator/unitNatureType",
        child: [],
      },
      {
        title: " Floor",
        menu: false,
        icon: "",
        path: "/app/administrator/floor",
        child: [],
      },
      {
        title: " Unit Type",
        menu: false,
        icon: "",
        path: "/app/administrator/unitType",
        child: [],
      },
      {
        title: " Ndc Charges",
        menu: false,
        icon: "",
        path: "/app/administrator/NdcCharges",
        child: [],
      },
      {
        title: " Street",
        menu: false,
        icon: "",
        path: "/app/administrator/street",
        child: [],
      },
      {
        title: " Category",
        menu: false,
        icon: "",
        path: "/app/administrator/category",
        child: [],
      },
    ],
  },
  {
    title: "File Management",
    menu: true,
    icon: "la la-file",
    path: "#",
    child: [
      {
        title: "Files",
        menu: false,
        icon: "",
        path: "/app/administrator/files",
        child: [],
      },
      {
        title: "File Submission",
        menu: false,
        icon: "",
        path: "/app/administrator/fileSubmission",
        child: [],
      },
    ],
  },
  {
    title: "Booking Management",
    menu: true,
    icon: "la la-book-open",
    path: "#",
    child: [
      {
        title: "Booking",
        menu: false,
        icon: "",
        path: "/app/administrator/booking",
        child: [],
      },
    ],
  },
  {
    title: "Cash Management",
    menu: true,
    icon: "las la-wallet",
    path: "#",
    child: [
      {
        title: "Transactions",
        menu: false,
        icon: "",
        path: "/app/administrator/transaction",
        child: [],
      },
      {
        title: "Report",
        menu: false,
        icon: "",
        path: "/app/administrator/report",
        child: [],
      },
      {
        title: "NDC Fee",
        menu: false,
        icon: "",
        path: "/app/administrator/ndcfee",
        child: [],
      },
    ],
  },
  {
    title: "Transfer Management",
    menu: true,
    icon: "las la-wallet",
    path: "#",
    slug: "my-pick",
    child: [
      {
        title: "File Transfer",
        menu: false,
        icon: "",
        path: "/app/administrator/transfer",
        child: [],
      },
      {
        title: "Category Transfer",
        menu: false,
        icon: "",
        path: "/app/administrator/categoryTransfer",
        child: [],
      },
      {
        title: "NDC Transfer",
        menu: false,
        icon: "",
        path: "/app/administrator/ndcTransfer",
        child: [],
      },
    ],
  },
  {
    title: "Verification Management",
    menu: true,
    icon: "las la-money-bill",
    path: "#",
    child: [
      {
        title: "Un-Verify Installments",
        menu: false,
        icon: "",
        path: "/app/administrator/unverifiedtransaction",
        child: [],
      },
    ],
  },
  {
    title: "Assets Management",
    menu: true,
    path: "/app/administrator/assets",
    icon: "la la-object-ungroup",
    child: [],
  },
  {
    title: "Settings",
    menu: true,
    path: "/settings/companysetting",
    icon: "la la-cog",
    child: [],
  },
  {
    title: "HR",
    menu: false,
    path: "",
    icon: "",
    child: [],
  },
  {
    title: "Jobs Management",
    menu: true,
    icon: "la la-briefcase",
    path: "#",
    child: [
      {
        title: "Jobs Dashboard",
        menu: false,
        icon: "",
        path: "/app/administrator/jobs-dashboard",
        child: [],
      },
      {
        title: "Manage Jobs",
        menu: false,
        icon: "",
        path: "/app/administrator/jobs",
        child: [],
      },
      {
        title: "Manage Resumes",
        menu: false,
        icon: "",
        path: "/app/administrator/manage-resumes",
        child: [],
      },
      {
        title: "Shortlist Candidates",
        menu: false,
        icon: "",
        path: "/app/administrator/shortlist-candidates",
        child: [],
      },
      {
        title: "Offer Approvals",
        menu: false,
        icon: "",
        path: "/app/administrator/offer_approvals",
        child: [],
      },
      {
        title: "Candidates List",
        menu: false,
        icon: "",
        path: "/app/administrator/candidates",
        child: [],
      },
    ],
  },
  {
    title: "Account Management",
    menu: true,
    icon: "la la-files-o",
    path: "#",
    child: [
      {
        title: "Categories",
        menu: false,
        icon: "",
        path: "/app/accounts/categories",
        child: [],
      },
      {
        title: "Income Category",
        menu: false,
        icon: "",
        path: "/app/accounts/incomecategory",
        child: [],
      },
      {
        title: "Expense Category",
        menu: false,
        icon: "",
        path: "/app/accounts/expensecategory",
        child: [],
      },
      {
        title: "Account Transactions",
        menu: false,
        icon: "",
        path: "/app/accounts/account-transactions",
        child: [],
      },
      {
        title: "Employee Salary History",
        menu: false,
        icon: "",
        path: "/app/accounts/employee-salary",
        child: [],
      },
      {
        title: "Budgets",
        menu: false,
        icon: "",
        path: "/app/accounts/budgets",
        child: [],
      },
      {
        title: "Budget Expenses",
        menu: false,
        icon: "",
        path: "/app/accounts/budget-expenses",
        child: [],
      },
      {
        title: "Budget Revenues",
        menu: false,
        icon: "",
        path: "/app/accounts/budget-revenues",
        child: [],
      },
      {
        title: "Account Settings",
        menu: false,
        icon: "",
        path: "/app/accounts/account-settings",
        child: [],
      },
    ],
  },
  {
    title: "Policies",
    menu: true,
    path: "/app/hr/policies",
    icon: "la la-file-pdf-o",
    child: [],
  },
];

// const filteredMenu = sideMenu.filter(item => item.menu === true);

// // OR
// const menusItem = sideMenu.find(item => item.path === "/app/main/dashboard");
// const menuItem = sideMenu.find(item => item.title === "Dashboard");

// if (menuItem) {
//   menuItem.child.push({
//     title: "",
//     menu: false,
//     icon: "",
//     path: "",
//     child: [],
//   });
// }
// function traverseMenu(menu) {
//     for (const item of menu) {
//       // Perform operations on 'item' here

//       // If there are child items, recursively traverse them
//       if (item.child.length > 0) {
//         traverseMenu(item.child);
//       }
//     }
//   }

//   // Call the function to traverse the entire menu structure
//   traverseMenu(sideMenu);
