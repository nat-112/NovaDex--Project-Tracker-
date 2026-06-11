# NovaDex--Project-Tracker
A browser based project management dashboard I built to trac    k a fintech product launch end - to -end  from initial requirements through to go live deployment. 
I got interested in project managemnt and wanted to build something that solved a real workflow problem: keeping track of where a project actually stands without having to dig through spreadsheets. This idea is simple  everything is in one place, visisble at a glance. 


---


## What it does 
**Task Register** a live table of every task in the project. Each task has an owner, priority, dealine and status dropdown you can update directly in the table. Overdue task flag automatically. 

**Kanban Board** - drag - drop cards across To Do, In Prgress, In Review and Done column. Updating a card here updates the task register too 
**Risk Register** - Logs project risks with likelihood and impact scores. Calculates a risk score automatically and colour codes by severity. Each risk has itigation note and an owner 

**Milestone Timeline** - Visual strip showing the six key projects phases, with done/ active /pending states 

**Stats & Progress Bar** - live counts of total, completed, in progress and blocked task, plus an overall completion percentage

--- 

## Why I built it 
Most projects tracking tools are eite=her too heavy or too basic(a shared spreadsheet). I wanted something lightweight that a small team or solo PM could open in browser and actually use - no login, no setup, just a clear view of the projects. 

It also gave me  a chnace to think through how data flows through UI - every status change, whether made in the table or on the  Kanban Board, updates the same underlying 

---

## Tech stack 
- Vanilla Javascript (no framework)
- HTML / CSS 
- Google fonts - Syne + DM Mono
- Drag and Drop API (native browser)

No build tools, no dependencies, no backend. Just open `Index.html`. 
--- 
## How to run it 
```bash 
git clone https://github.com/yourusername/NovaDex-Project-Tracker
cd NovaDex -Project-Tracker 
open Index.html 
```

or just download the repo and open `Index.html` in any browser. 
--- 

## Project structure 

``` 
├── Index.html       # Main layout and tab structure
├── Style.css        # All styling — dark theme, components, animations
└── app.js           # Data, render functions, drag-and-drop, modal logic 
```

--- 
## What I'd add next 
- Local storage so tasks persist between sessions 
- Ability to edit and delete exisiting task(not just add)
- Filter tasks by owner or status 
- Export to CSV 
--- 

