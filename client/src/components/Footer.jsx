// import React from 'react';
// import facebook from '../assets/facebook.png';
// import twitter from '../assets/twitter.png';
// import instagram from '../assets/instagram.png';
// import linkedin from '../assets/linkedin.png';

// const Footer = () => {
//   const [feedback, setFeedback] = React.useState('');
//   const user=JSON.parse(localStorage.getItem("user"));
//   const handleFeedback=()=>{
//     if(!user){
//       alert("Please login to provide feedback");
//       return;
//     }
//    fetch("http://localhost:5000/auth/feedback",{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
      
//     },
//     body:JSON.stringify({feedback, userId:user._id})
//    }).then(res=>res.json()).then(data=>{
//       if(data.success){
//         alert("Feedback submitted successfully");
//         setFeedback('');
//       }else{
//         alert("Failed to submit feedback");
//       }
//    }).catch(err=>{
//       console.error("Error submitting feedback:", err);
//       alert("An error occurred while submitting feedback");
//     }
//   )
//   }
//   const handleOnChange=(e)=>{
//      setFeedback(e.target.value);
//   }
//   return (
//     <footer className="fixed bottom-0 bg-[#101010] text-white w-full">
//       <div className="max-w-6xl mx-auto px-3 py-3 grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* Section 1: Brand Info */}
//         <div>
//           <h1 className="text-xl font-semibold mb-2">InterviewPrep</h1>
//           <p className="text-gray-400 text-sm">
//             Helping you crack interviews confidently with AI-driven feedback and curated questions.
//           </p>
//         </div>

//         {/* Section 2: Feedback */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2">Your Feedback</h2>
//           <p className="text-gray-400 text-sm mb-2">Tell us how we can improve.</p>
//           <textarea value={feedback} name="feedback" onChange={handleOnChange}
//             className="w-full p-2 rounded-md bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
//             rows="2"
//             placeholder="Your feedback here..."
//           ></textarea>
//           <button onClick={handleFeedback}  className="mt-3 bg-gray-800 hover:bg-blue-700 text-sm px-4 py-2 rounded-md transition w-3/12">
//             Submit
//           </button>
//         </div>

//         {/* Section 3: Follow Us */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
//           <p className="text-gray-400 text-sm mb-3">Stay connected</p>
//           <div className="flex gap-4">
//             {[facebook, twitter, instagram, linkedin].map((icon, index) => (
//               <div
//                 key={index}
//                 className=" cursor-pointer w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white transition"
//               >
//                 <img src={icon} alt="Social" className="w-5 h-5" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Footer */}
//       <div className="bg-[#080808] py-3 text-center text-sm text-gray-400">
//         &copy; {new Date().getFullYear()} AceMyInterview. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';

const Footer = () => {
  const [feedback, setFeedback] = React.useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFeedback = () => {
    if (!user) {
      alert("Please login to provide feedback");
      return;
    }

    fetch("http://localhost:5000/auth/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback, userId: user._id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Feedback submitted successfully");
          setFeedback('');
        } else {
          alert("Failed to submit feedback");
        }
      })
      .catch(err => {
        console.error("Error submitting feedback:", err);
        alert("An error occurred while submitting feedback");
      });
  };

  const handleOnChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <footer className="bg-[#101010] text-white w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">

        {/* Section 1: Brand Info */}
        <div>
          <h1 className="text-xl font-semibold mb-2 text-white">InterviewPrep</h1>
          <p className="text-gray-400 text-sm">
            Helping you crack interviews confidently with AI-driven feedback and curated questions.
          </p>
        </div>

        {/* Section 2: Feedback */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-white">Your Feedback</h2>
          <p className="text-gray-400 text-sm mb-2">Tell us how we can improve.</p>
          <div className="mt-1">
            <textarea
              name="feedback"
              value={feedback}
              onChange={handleOnChange}
              className="w-full p-2 text-sm rounded-md bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="2"
              placeholder="Your feedback here..."
            ></textarea>
            <button
              onClick={handleFeedback}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-md transition"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Section 3: Follow Us */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-white">Follow Us</h2>
          
          <div className="flex gap-4">
            {[facebook, twitter, instagram, linkedin].map((icon, index) => (
              <div
                key={index}
                className="cursor-pointer w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white transition"
              >
                <img src={icon} alt="Social" className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#080808] py-3 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AceMyInterview. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
