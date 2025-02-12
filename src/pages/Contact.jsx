import { Button, Card, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import NavbarMain from "../components/NavbarMain";
import Footer from "../components/Footer";
import { FaRegMessage } from "react-icons/fa6";
import toast from "react-hot-toast";
const Contact = () => {
  const [error, setError] = useState({})
  const handleContactForm = (e) =>{
    e.preventDefault()
    const form = e.target;
    console.log(form.email.value, form.subject.value, form.message.value);
    const email = form.email.value;
    const subject = form.subject.value;
    const msg = form.message.value;
    
    if(!email) return setError({email: "Email required."})
    if(!subject) return setError({email: "Subject required."})
    if(!msg) return setError({email: "Message required."})
    else setError({})
    form.reset()
    toast.success("We accept your message. As soon as possible we response your message.")
  }

    return (
        <div>
            <NavbarMain></NavbarMain>

            <div className="container  mx-auto mt-20 py-16 text-black dark:text-white ">
            <Card >
        {/* <Drawer.Header title="CONTACT US" titleIcon={HiEnvelope} /> */}
        {/* <Drawer.Items> */}
        <h1 className="flex gap-3 text-3xl items-center justify-center"><HiEnvelope/> CONTACT US</h1>
          <form onSubmit={handleContactForm}>
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              
              <input placeholder="name@company.com" type="email" name="email" className="p-2 w-full rounded-lg bg-white border dark:bg-gray-900 dark:border-gray-600"/>
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <input type="text" placeholder="Let us know how we can help you" name="subject" className="p-2 w-full rounded-lg bg-white border dark:bg-gray-900 dark:border-gray-600"/>
              {/* <TextInput id="subject" name="subject"  placeholder="Let us know how we can help you" /> */}
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea id="message" name="message" className="p-2 w-full rounded-lg bg-white border dark:bg-gray-900 dark:border-gray-600" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              {/* <Button type="submit" className="w-full text-black dark:text-white">
                
              </Button> */}
              <button className='group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md  bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(76_100_255)] border-2 border-[#263381]  bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 hover:[box-shadow:5px_5px_rgb(38_51_129)] translate-x-[3px] hover:translate-x-[0px] translate-y-[3px] hover:translate-y-[0px]   [box-shadow:0px_0px_rgb(38_51_129)] dark:hover:[box-shadow:5px_5px_rgb(76_100_255)]dark:active:[box-shadow:0px_0px_rgb(76_100_255)] active:[box-shadow:0px_0px_rgb(38_51_129)] active:translate-y-[3px] active:translate-x-[3px]'>
              Send message
      </button>
            </div>
       
            
          </form>
        {/* </Drawer.Items> */}
      </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;