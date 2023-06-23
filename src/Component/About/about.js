import { Navebar } from '../Navbar/Navbar'
import './about.css';
export default function About() {
    return <>
        <Navebar />
        <div className="container" id='divFirst'>
            <div className='aboutBox mt-2'>
                <div className='aboutBoxImage' >
                    <img id='imageArtist' src='/img/arijit.jpg' />
                </div>
                <div className='aboutBoxContent'>
                    <h1>About</h1>
                    <h5 id='about1'> The main purpose of creating my wings is to provide a plateform a artist whose want to show their art in front of public.
it is not only for the person who's only want to follow their passion as well as it is for the person who's in working profession and want to follow their passion.
many people among us who's are very talented for his talent, but they didn't get a plateform to show their talent in public so that his talent remains hidden.
for unhide their talent we introduce "mywings".
Once a artist connect with the mywings so we provide him many shows and concert's with the help of this shows and concert's they increase their fame and fanfollowing</h5>
                </div>
            </div>
        </div><br />

        <div className="container" id='divFirst'>
            <div className='aboutBox mt-5'>
                <div className='aboutBoxContent'>
                    <h1>Collaboration</h1>
                    <h5>It is a good thing for all parties who work together to achieve a common goal.
We are doing collaboration with many organization some of these like Mejbaan,Vivah-Vyavastha and many more.
This thing is good for artist as well as for the organization .
If you want any type of collaboration kindly contact us.</h5>
                </div>
                <div className='aboutBoxImage' >
                    <img id='aboutBoxContentImage' src='/img/collaboration.jpeg' />
                </div>
            </div>
        </div><br/>


        <div className='container-fluid' >
            <div className='row footer'>
                <div className='col-md-4 footer1'>
                    <h2>My Wings</h2>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dolorem accusantium architecto id quidem, itaque nesciunt quam ducimus atque.</h5>
                    <div id='footerIcon'>
                        <i class="fa fa-facebook-square"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-twitter-square" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-linkedin-square" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='col-md-4 footer2'>
                    <h4>Contact Info</h4>
                    <div className='row'>
                        <div className='col-md-2'><i class="fa fa-map-marker" style={{ fontSize: '40px' }} aria-hidden="true"></i></div>
                        <div className='col-md-10'><p>170,Jawahar Marg,Near city nursing home and HDFC Bank,Raj Mohalla.Indore</p></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'><i class="fa fa-phone" style={{ fontSize: '40px' }} aria-hidden="true"></i></div>
                        <div className='col-md-10'><p>9898989898</p></div>
                    </div><br/>
                    <div className='row'>
                        <div className='col-md-2'><i class="fa fa-envelope" style={{ fontSize: '30px' }} aria-hidden="true"></i></div>
                        <div className='col-md-10'><p>setbug56@gmail.com</p></div>
                    </div>
                </div>
                <div className='col-md-4 footer3'>
                    <iframe id='footerMap' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.361715866973!2d75.83949662448461!3d22.71479312774523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fda443151739%3A0x6ce417b05ec77e4!2sRaj%20Mohalla%2C%20Indore%2C%20Madhya%20Pradesh%20452002!5e0!3m2!1sen!2sin!4v1683283710117!5m2!1sen!2sin" ></iframe>
                </div>
            </div>
        </div>

    </>
}