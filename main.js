(()=>{"use strict";const e=(e,t)=>({getName:()=>e,getTodos:()=>t,addTodo:e=>t.push(e)});function t(e,t,o){const n=document.createElement(e,t);return t&&n.classList.add(t),o&&(n.textContent=o),n}function o(e,o,n,c){const d=t("DIV","todo"),r=t("INPUT","todo-checkbox");r.type="checkbox";const a=t("H3","todo-title",o),l=t("H4","todo-date",n),u=t("P","todo-descrip",c),i=t("HR","todo-hr");d.append(r,a,l,u,i),e.append(d)}function n(e,t){e.style.display=t}const c=(()=>{const c=document.querySelector(".new-project-button"),d=document.querySelector(".new-project-form"),r=document.querySelector(".add-project-button"),a=document.querySelector(".projects-cont"),l=document.querySelector(".project-heading"),u=document.querySelector(".new-todo-button"),i=document.querySelector(".add-todo-button"),s=document.querySelector(".new-todo-form"),m=document.querySelector(".todo-cont"),p=[e("Inbox",[])];return p[0].DOMElement=a.children[0],p[0].DOMElement.classList.add("active"),{handleProjectChangeRequest:function(){document.addEventListener("click",(e=>{if("project"===e.target.classList[0]){document.querySelector(".active").classList.remove("active");const t=e.target;t.classList.add("active"),p.forEach((e=>{e.DOMElement===t&&(l.textContent=e.getName(),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(m),e.getTodos().forEach((e=>{o(m,e.getTitle(),e.getDescrip(),e.getDueDate(),e.getPriority())})))}))}}))},handleNewProjectRequest:function(){c.addEventListener("click",(e=>{n(d,"block")}))},handleAddProjectRequest:function(){r.addEventListener("click",(o=>{let c=document.getElementById("project-name");if(""===c.value)alert("Project must have a name");else{const o=e(c.value,[]),u=function(e){const o=t("DIV","project"),n=t("H3","project-label",e);return o.append(n),o.classList.add(e),o}(o.getName());o.DOMElement=u,r=a,l=o.DOMElement,r.append(l),c.value="",n(d,"none"),p.push(o)}var r,l}))},handleNewTodoRequest:function(){u.addEventListener("click",(e=>{n(s,"block")}))},handleAddTodoRequest:function(){i.addEventListener("click",(e=>{const t=document.getElementById("todo-title");if(""===t.value)alert("todo must have a title");else{const e=document.getElementById("todo-descrip"),l=document.getElementById("todo-date"),u=(c=t.value,d=e.value,r=l.value,a="1",{getTitle:()=>c,editTitle:e=>c=e,getDescrip:()=>d,editDescrip:e=>d=e,getDueDate:()=>r,editDueDate:e=>r=e,getPriority:()=>a,editPriority:e=>a=e});o(m,u.getTitle(),u.getDescrip(),u.getDueDate(),u.getPriority()),n(s,"none");const i=document.querySelector(".active");p.forEach((e=>{e.DOMElement===i&&(console.log(e),e.addTodo(u))}))}var c,d,r,a})),s.style.display="none"}}})();c.handleProjectChangeRequest(),c.handleNewProjectRequest(),c.handleAddProjectRequest(),c.handleNewTodoRequest(),c.handleAddTodoRequest()})();
//# sourceMappingURL=main.js.map