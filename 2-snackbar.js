import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i}from"./assets/vendor-BbbuE1sJ.js";const s=document.querySelector('input[name="delay"]'),n=document.querySelector('input[type="radio"][name="state"][value="fulfilled"]'),c=document.querySelector('input[type="radio"][name="state"][value="rejected"]'),u=document.querySelector("button[type=submit]");function o(t,e){return new Promise((l,a)=>{setTimeout(()=>{t?(i.success({title:"Success",message:`Fulfilled promise in ${e}ms`,position:"topRight"}),l()):(i.error({title:"Error",message:`Rejected promise in ${e}ms`,position:"topRight"}),a())},e)})}function r(){s.value="",n.checked=!1,c.checked=!1}u.addEventListener("click",t=>{t.preventDefault();const e=s.value;if(!e||e<=0){i.error({title:"Error",message:"Please enter a valid delay",position:"topRight"});return}n.checked?(o(!0,e),r()):c.checked&&(o(!1,e),r())});
//# sourceMappingURL=2-snackbar.js.map
