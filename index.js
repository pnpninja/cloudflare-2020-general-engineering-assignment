addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */


links = [{"name":"Facebook","url":"http://facebook.com"},{"name":"Google","url":"http://google.com"},{"name":"Netflix","url":"http://netflix.com"}]
templatePage = "https://static-links-page.signalnerve.workers.dev"

/**
* Transform Link to be added to page
*
**/
class CustomLinkTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    this.links.forEach(function(link){
      element.append("<a href=\""+link["url"]+"\">"+link["name"]+"</a>",{html:true})
    })  
  }
}

/**
* Transform Page to show profile
*
**/
class CustomProfileTransformer{
  constructor() {
    
  }

  async element(element){
    element.removeAttribute("style")
  }
}
/**
* Transform Page to show my pic
*
**/
class CustomImageTransformer{
  constructor() {
    
  }

  async element(element){
    element.setAttribute("src","https://avatars3.githubusercontent.com/u/5502846?s=400&u=e2419d4a8c9a533a015a968d56ac699b88c80af1&v=4")
  }
}

/**
* Transform Page to show my name
*
**/
class CustomNameTransformer{
  constructor() {
    
  }

  async element(element){
    element.append("Prateek Narendra",{html:false})
  }
}

/**
* Transform Page to show my social links
*
**/

class CustomSocialLinkTransformer{
  constructor() {
    
  }

  async element(element){
    element.removeAttribute("style")   
    element.append("<a href=\""+"https://github.com/pnpninja/"+"\">"+"<svg><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></svg>"+"</a>",{html:true})
    element.append("<a href=\""+"https://www.linkedin.com/in/prateeknar/"+"\">"+"<svg><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/></svg>"+"</a>",{html:true})
  }
}

/**
* Transform Page to change title
*
**/
class CustomTitleTransformer{
  constructor() {
    
  }

  async element(element){
    element.setInnerContent("Prateek Narendra",{html:false})
  }
}

/**
* Transform Page to change background color
*
**/

class CustomBackgroundColorTransformer{
  constructor() {
    
  }

  async element(element){
    element.setAttribute("class","bg-blue-400")
  }
}

/**
* Serve requests
*
**/
async function handleRequest(request) {
  let path = new URL(request.url).pathname
  if(path === "/links"){ 
  	 return new Response(JSON.stringify(links,null,2), {
      headers: { 'content-type': 'application/json' },
    })
  }else{
    const webpage = await fetch(templatePage)
    return new HTMLRewriter().on("body",new CustomBackgroundColorTransformer()).on("title",new CustomTitleTransformer()).on("div#links",new CustomLinkTransformer(links)).on("div#profile",new CustomProfileTransformer()).on("img#avatar",new CustomImageTransformer()).on("h1#name",new CustomNameTransformer()).on("div#social",new CustomSocialLinkTransformer()).transform(webpage)
  }
    
  
}
  

