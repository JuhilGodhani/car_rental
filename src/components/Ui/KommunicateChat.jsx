import React from 'react'

// class KommunicateChat extends Component{
//     constructor(props){
//         super(props);
//     }
//     componentDidMount(){
//         (function(d, m){
//             var kommunicateSettings = {"appId":"3b470927b7e8be1bcebab355b6bccda80","popupWidget":true,"automaticChatOpenOnNavigation":true};
//             var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
//             s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//             var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
//             window.kommunicate = m; m._globals = kommunicateSettings;
//           })(document, window.kommunicate || {});
//     }
//     render(){
//         return(
//             <div> </div>
//         )
//     }
// }



const KommunicateChat = () => {
   {
                (function(d, m){
                    var kommunicateSettings = {"appId":"3b470927b7e8be1bcebab355b6bccda80","popupWidget":true,"automaticChatOpenOnNavigation":true};
                    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
                    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
                    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
                    window.kommunicate = m; m._globals = kommunicateSettings;
                  })(document, window.kommunicate || {});
            }
  return (
    <div>KommunicateChat</div>
  )

  }

export default KommunicateChat

