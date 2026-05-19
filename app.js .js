// This file handles all intereactions 
//This being rendering tasks and stats 
// Kanban darg and drop 
// Adding new tasks through modal 
// adding new tasks through the modal 
// risk register rendering 

// I'm storing all task dtaa in this data array so everything 
// re renders from one source of truth whenever something changes 

const tasks = [ 
    // remeber to fix this before 
    { id:1, name:" Define product requirements & scope", owner: "Natasha W", initials: "nw", color: "#58a6ff", priority: "high", 
        deadline:"10-02-2026", status: "done" },

        { id:2, name:"Stakeholder kick-off meeting", owner: "James O", initials: "JO", color: "#3fb950", priority: "high", 
        deadline:"14-02-2026", status: "done" }, 

        { id:3, name:"UX wireframes & user journey mapping", owner: "James O", initials: "JO", color: "#d29922", priority: "high", 
        deadline:"14-02-2026", status: "done" }, 

        { id:4, name:"Technical architecture sign-off", owner: "James O", initials: "JO", color: "#58a6ff", priority: "high", 
        deadline:"14-02-2026", status: "done" }, 

        { id:5, name:"Backend API development", owner: "James O", initials: "JO", color: "#8b949e", priority: "high", 
        deadline:"14-02-2026", status: "done" }, 

        { id:6, name:"Frontend build & integration ", owner: "James O", initials: "JO", color: "#8b949e", priority: "high", 
        deadline:"14-02-2026", status: "done" }, 

        { id:7, name:"QA testing - regression suits", owner: "James O", initials: "JO", color: "#f85149", priority: "high", 
        deadline:"14-02-2026", status: "inprogress" }, 

        { id:8, name:"Security and penetration testing", owner: "James O", initials: "JO", color: "#3fb950", priority: "high", 
        deadline:"14-02-2026", status: "inprogress" }, 

        { id:9, name:"Performance and load testing ", owner: "James O", initials: "JO", color: "#f85149", priority: "high", 
        deadline:"14-02-2026", status: "inprogress" }, 

        { id:10, name:"Marketing launch assets ", owner: "James O", initials: "JO", color: "#d29922", priority: "high", 
        deadline:"14-02-2026", status: "review " }, 

        { id:11, name:"App store submission (IOS & Android)", owner: "James O", initials: "JO", color:"#8b949e", priority: "high", 
        deadline:"14-02-2026", status: "to-do" }, 

        { id:12, name:"Customer support team training", owner: "James O", initials: "JO", color: "#58a6ff", priority: "high", 
        deadline:"14-02-2026", status: "to-do" }, 

        { id:13, name:"GDPR compliance review ", owner: "James O", initials: "JO", color: "#3fb950", priority: "high", 
        deadline:"14-02-2026", status: "blocked" }, 

        { id:14, name:"Launch comms & press release", owner: "Sara K", initials: "SK", color:"#d29922", priority: "med", 
        deadline:"14-02-2026", status: "to-do" }, 

        { id:15, name:"Go-live deployment & monitoring", owner: "Dev Team", initials: "DT", color: "#8b949e", priority: "high", 
        deadline:"25-07-2026", status: "to-do" }, 
]


const risks = [
    {id: 1, desc:"GDPR compliance delays push back launch", category: "Legal", likelihood:4, impact:5, mitigation: "Engagage legal team immediatly, Weekly compliance check- ins" },
    {id: 2, desc:"App store rejection on first submission", category: "Technical", likelihood:3, impact:4, mitigation: "Review Apple/Google guidelines throughly before submission" }, 
    {id: 3, desc:"Key developer unavailable during testing phase ", category: "Resource ", likelihood:2, impact:4, mitigation: "Cross-train two developers on critical systems" }, 
    {id: 4, desc:" Security vulnerability found post-launch", category: "Security ", likelihood:2, impact:5, mitigation: "Penetration testing before go-live. Incident response plan ready." }, 
    {id: 5, desc:"Marketing assests not ready in time for launch ", category: "Marketing ", likelihood:3, impact:3, mitigation: "Set Internal deadline 2 weeks before launch date." }, 
    {id: 6, desc:"Performance issues under high uder load ", category: "Technical", likelihood:3, impact:4, mitigation: "Load test with 2x expected traffic. Auto-scaling configured." }, 
    {id: 7, desc:"Scope creep delaying final delivery", category: "Project  ", likelihood:4, impact:3, mitigation: "Strict change control process. Any new features go to backlog " }, 
    {id: 8, desc:"Third-party  payment API outage at launch", category: "Technical ", likelihood:2, impact:5, mitigation: "Identity backup payment provider. Test failover process" }, 
]; 

// Milestone for the timeline strip 
const milestones = [
    {name:"Project Kickoff", date:"Feb 2026", state:"done-m" }, 
     {name:"Design Complete", date:"Mar 2026", state:"done-m" }, 
      {name:"Developement Done", date:"May 2026", state:"done-m" }, 
       {name:"Testing Phase", date:"May 2026", state:"active-m" }, 
        {name:"App Store Submit ", date:"Jun 2026", state:"" }, 
         {name:"Go Live", date:" Jun 2026", state:"" }, 
]; 

// Lookup objects so I don't have to write lots of if / else blocks 
const priorityClass = { high:"badge badge-high", med:"badge badge-med", low:"badge badge-low"}; 
const priorityLabel = { high: "High", med:"Medium", low:"Low"}

const statusClass = {
    done: "badge statue-done", 
    inprogress: "badge status-progress",
    review: "badge status-review",
    todo: " badge status-todo",
    blocked: "badge status-blocked",
}; 
const statusLable = {
    done: "Done", 
    inprogress: "In Progress", 
    review: "In Review", 
    todo: "To Do", 
    blocked: "Blocked", 
}; 

// maps status to which kanban column it belongs in 
const kanbanColMap = {
    todo: "col -todo", 
    inprogress: "col-progress",
    review: "col-review", 
    done: "col-done", 
    blocked: "col-todo"
}; 
const kanbanCountIds = {
    todo: "count-todo",
    inprogress: "count-inprogress", 
    review: "count-review",
    done: "count-done", 
}; 
//Used to track which task is being dragged 
let dragId = null; 
//Render Functions 
function renderTable() {
    const tbody = document.getElementById("task-tbody");
    tbody.innerHTML = ""; 

    tasks.forEach(t => {
        const d1 = new Date(t.deadline); 
        const today = new Date(); 
        const overdue = d1 < today && t.status !== "done"; 
        const d1Str = d1.toLocaleDateString("en-GB", { day: "2-digit", month:"short", year:"numeric" }); 
        const idStr = String(t.id).padStart(2, "0");

    
}); 
}