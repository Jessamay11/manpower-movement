/*
  MANPOWER MOVEMENT DATA
  HR: ito lang ang file na kailangan mong baguhin. Pwede mong gamitin ang editor.html
  para hindi na mano-manong mag-edit dito, tapos i-download ang bagong data.js at
  palitan ang luma.

  type ay isa sa: Hire, Promotion, Transfer, Resignation, Retirement, End of Contract
  date ay YYYY-MM-DD
*/
window.MANPOWER_DATA = {
  "meta": {
    "headcount": 248,
    "asOf": "2026-11-02",
    "announcement": "Sample announcement: Year-end manpower report is due Nov 28. Please send transfer requests to HR before Nov 15.",
    "sample": true
  },
  "movements": [
    {"date":"2026-10-28","type":"Hire","name":"Maria Angela Cruz","position":"Accounting Staff","department":"Finance","detail":"Regular, replacement hire"},
    {"date":"2026-10-21","type":"Promotion","name":"Joel R. Mendoza","position":"Operations Supervisor","department":"Operations","detail":"From Team Lead"},
    {"date":"2026-10-15","type":"Resignation","name":"Katrina D. Villanueva","position":"HR Assistant","department":"HR","detail":"Last day Oct 15"},
    {"date":"2026-10-01","type":"Transfer","name":"Paolo S. Reyes","position":"Sales Associate","department":"Sales","detail":"From Admin to Sales"},
    {"date":"2026-09-16","type":"Hire","name":"Dennis A. Lim","position":"IT Support","department":"IT","detail":"New position"},
    {"date":"2026-09-01","type":"End of Contract","name":"Rhea M. Pascual","position":"Admin Aide","department":"Admin","detail":"Project-based, ended"},
    {"date":"2026-08-17","type":"Hire","name":"Carlo B. Navarro","position":"Sales Executive","department":"Sales","detail":"Regular"},
    {"date":"2026-08-03","type":"Retirement","name":"Teresita G. Ramos","position":"Finance Manager","department":"Finance","detail":"Compulsory retirement"},
    {"date":"2026-07-20","type":"Promotion","name":"Anne Marie T. Go","position":"Senior Accountant","department":"Finance","detail":"From Accountant"},
    {"date":"2026-07-06","type":"Hire","name":"Miguel C. Aquino","position":"Warehouse Staff","department":"Operations","detail":"Regular"},
    {"date":"2026-06-15","type":"Resignation","name":"Jessa L. Bautista","position":"Sales Associate","department":"Sales","detail":"Last day Jun 15"},
    {"date":"2026-06-01","type":"Transfer","name":"Ramon F. Dizon","position":"Technician","department":"Operations","detail":"From IT to Operations"},
    {"date":"2026-05-18","type":"Hire","name":"Grace P. Soriano","position":"HR Officer","department":"HR","detail":"Replacement hire"},
    {"date":"2026-04-10","type":"Resignation","name":"Alvin Q. Torres","position":"IT Analyst","department":"IT","detail":"Last day Apr 10"},
    {"date":"2026-03-02","type":"Hire","name":"Liza H. Fernandez","position":"Admin Officer","department":"Admin","detail":"Regular"},
    {"date":"2026-01-12","type":"Promotion","name":"Mark Anthony V. Salazar","position":"IT Manager","department":"IT","detail":"From Senior Analyst"}
  ]
};
