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

        const row = document.createElement("tr"); 
        row.innerHTML = `
        <td style="color:var(--muted); font-size:0.72rem">${idStr}</td>
        <td class="task-name">${t.name}</td>
        <td>
        <div class="task-owner">
        <div class= "avatar" style="background:${t.color}22;color:${t.color}; border:1px solid ${t.color}44">${t.initials}</div>
        <span style="font-size: 0.78rem; color:var(--muted)"> ${t.owner}</span>
        </div>
        </td>
        <td><span class="${priorityClass[t.priority]}">${priorityLabel[t.priority]} </span></td>
        <td><span class="deadline${overdue ? "overdue" : ""}">${dlStr}${overdue ? "⚠" : ""} </span></td>
        <td>
        <select class="badge ${statusClass[t.status]. replace('badge', '')} status-select" data-id=${t.id}" onchange="changeStatus(${t.id}, this.value)">
        <option value="todo" ${t.status=="todo" ? "selected":""}> To Do</option>
        <option value="inprogress" ${t.status=="inprogress" ? "selected":""}> In progress</option>
        <option value="review" ${t.status=="review" ? "selected":""}> In Review</option>
        <option value="Done" ${t.status=="done" ? "selected":""}> Done</option>
        <option value="blocked" ${t.status=="blocked" ? "selected":""}> Blocked</option>
        </select>
        </td>`; 
        tbody.appendChild(row); 
}); 
}
function renderStats() {
    const total = tasks.length; 
    const done = tasks.filter(t => t.status === "done").length; 
    const inprog = tasks.filter(t => t.status === "inprogress").length; 
    const blocked = tasks.filter(t => t.status === "blocked").length; 
    const pct  =Math.round((done / total) * 100); 

    document.getElementById("stat-total").textContent = total; 
    document.getElementById("stat-done").textContent = done; 
    document.getElementById("stat-progress").textContent = inprog; 
    document.getElementById("stat-blocked").textContent = blocked; 
    document.getElementById("pct-label").textContent =pct + "%"; 

    setTimeout(() => {
        document.getElementById("progress-fill").style.width = pct + "%"; 
    }, 200); 
}

function renderKanban() {
    //group tasks by their Kanban 
    const cols = {todo:[], inprogress:[], review:[], done:[] }; 
    tasks.forEach(t => {
        const col =t.status === "blocked" ? "todo" : t.status; 
        if (cols[col] !== undefined) cols[col]. push(t); 
    }); 
    //clearing existing cards from each column 
    ["todo", "inprogress", "review", "done"].forEach(col => {
        const colEl = document.getElementById("col-" +(col === "inprogress" ? "progress" : col)); 
        colEl.querySelectorAll(".kanban-card").forEach(c => c.remove()); 
        document.getElementById("count-" + col).textContent = cols[col].lenght; 

        cols[col].forEach(t => {
            const card = document.createElement("div");
            card.className = "Kanban-card";
            card.draggable = true; 
            card.dataset.id = t.id; 
            card.innerHTML = `
            <div class="kanban-card-title">${t.name}</div>
            <div class="kanban-acrd-footer">
            <span class="kanban-card-tag">${priorityLabel[t.priority]} </span>
            <div class="avatar" style="background:${t.color}22;color:${t.color};border:1px soild ${t.color}44;width:22px;
            height:22px;font-size:0.55rem">${t.initials}</div>
            </div> `; 

            card.addEventListener("dragstart", (e) => {
                dragId = t.id; 
                setTimeout(() => card.classList.add("dragging"), 0); 
            });
            card.addEventListener("dragend", () => {
                card.classList.remove("dragging"); 
            }); 
            colEl.appendChild(card);

        });
    });
}

function renderRisks() {
    const tbody = document .getElementById("risk-tbody"); 
    tbody.innerHTML = "";
    risks.forEach((r, i) => {
        const score = r.likelihood * r.impact; 
        let riskLevel  =  score <= 6 ? "Low" : score <= 12 ? "Medium" : "High";
        let riskClass = score <= 6 ? "risk-low" : score <= 12 ? "risk-medium": "risk-high"; 
        tbody.innerHTML +=  `
        <tr>
        <td style="color:var(--muted); font-size:0.72rem">${String(i+1).padStart(2,"0")}</td>
        <td style="font-size:0.82rem;font-weight:500;max-width:200px">${r.desc}</td>
        <td><span class="badge status-todo">${r.category}</span></td>
        <td style="text-align:center;color:var(--muted)">${r.likelihood}/5</td>
        <td style="text-align:center;color:var(--muted)">${r.impact}/5</td>
        <td style="text-align:center"><span class="badge">${riskClass}"> ${score} - ${riskLevel}</span></td>
        <td style="font-size:0.75rem;color:var(--muted)max-width:220px;line-height:1.5">${r.mitigation}</td>
        <td style="font-size:0.82rem;color:var(--muted)">${r.owner}</td>
        </tr>
        `; 
    });
}
function renderTimeline(){
    const container = document.getElementById("timeline"); 
    container.innerHTML = ""; 
    milestones.forEach(m => {
        const el = document.createElement("div");
        el.className = ` milestone ${m.state}`;
        el.innerHTML = ` 
        <div class="milestone-dot">${m.state === "done-m" ? "✓" : m.state === "active-m" ? "●" : "" } </div>
        <div class="milestone-name">${m.name}</div>
         <div class="milestone-date">${m.date}</div>
        `; 
        container.appendChild(el); 
    }); 
}

//Interactions 
// called when the status dropdown in the table changes 
function changeStatus(id, newStatus) {
    const task = tasks.find(t => t.id == id); 
    if(task){
        task.status = newStatus; 
        renderAll(); // allows Kanban and the stats to stay in sync by re-rendering everything. 
    }
}

// drag and drop handlers 
function allowDrop(e){
    e.preventDefault(); 
    e.currentTarget.classList.add("drag-over")
}
function drop(e, newStatus) {
    e.preventDefault(); 
    e.currentTarget.classList.remove("drag-over"); 

    if (dragId === null) return; 
    const task = tasks.find(t => t.id === dragId); 
    if (task && task.status !== "blocked") {
        task.status = newStatus; 
        renderAll(); 
    }
    dragId = null; 
}

// removes drag-over highlight whe leaving a column
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(" .kanban-col").forEach(col => {
            col.addEventListener("dragleave", () => col.classList.remove("drag-over")); 
        });
    }); 

    //TABS 
    function switchTab(tabName, btn) {
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
         document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
          document.getElementById(".tab-" +tabName).classList.add("active");
          btn.classList.add("active"); 
    }
    //Modal 
    function openModal() {
        document.getElementById("modal-overlay").classList.add("open")
    }

    function closeModal(){
        document.getElementById("modal-overlay").classList.remove("open"); 
            // clears the form list 
            document.getElementById("new-task-name").value = ""; 
            document.getElementById("new-task-owner").value = ""; 
            document.getElementById("new-task-deadline").value = ""; 
        } 
        function addTask() {
            const name = document.getElementById("new-task-name").value.trim(); 
            const owner = document.getElementById("new-task-owner").value.trim(); 
            const deadline = document.getElementById("new-task-deadline").value.trim(); 
            const priority= document.getElementById("new-task-priority").value.trim(); 
            const status = document.getElementById("new-task-status").value.trim(); 

            // Validations 
            if (!name || !owner || !deadline) {
                aleart("Please fill in the task name, owner and deadline. "); 
                return; 
            }
            //creates initials
            const parts = owner.split(" "); 
            const initials = parts.map(p => p[0]).join("").toUpperCase().slice(0.2); 

            //Picks colour based on tasks 
            const colours = ["#58a6ff","#3fb950","#d29922","#f85149","#8b949e","#bc8cff"]; 
            const colour = colours[tasks.lenght % colours.lenght]; 

            const newTask = {
                id:  task.lenght + 1,
                name, 
                owner, 
                initials,
                color: colour, 
                priority,
                deadline,
                status,

            }; 
            tasks.push(newTask);
            closeModal();
            renderAll();
        } 

        function renderAll() {
            renderTable(); 
            renderStats(); 
            renderKanban(); 
            renderRisks(); 
            renderTimeline(); 
        }
        document.addEventListener("DOMContentLoaded", renderAll); 
        
    