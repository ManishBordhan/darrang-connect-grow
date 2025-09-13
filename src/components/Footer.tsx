const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-yellow-400 mb-4">
              Darrang College
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Established as a premier institution of higher learning, 
              fostering academic excellence and character development since our founding.
            </p>
            <div className="text-white/80 text-sm">
              <p>Tezpur, Assam</p>
              <p>Pin: 784001</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="https://darrangcollege.ac.in/about.php" className="hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="https://darrangcollege.ac.in/alumni_list.php" className="hover:text-yellow-400 transition-colors">Alumni Directory</a></li>
              <li><a href="https://darrangcollege.ac.in/job_alert.php" className="hover:text-yellow-400 transition-colors">Job Alert</a></li>
              <li><a href="https://darrangcollege.ac.in/notice.php" className="hover:text-yellow-400 transition-colors">News & Updates</a></li>
              <li><a href="https://darrangcollege.ac.in/contact.php" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Academics */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Academics</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="https://darrangcollege.ac.in/admission_data.php" className="hover:text-yellow-400 transition-colors">Admission</a></li>
              <li><a href="https://darrangcollege.ac.in/academics.php" className="hover:text-yellow-400 transition-colors">Courses Offered</a></li>
              <li><a href="https://darrangcollege.ac.in/academiccalender.php" className="hover:text-yellow-400 transition-colors">Academic Calendar</a></li>
              <li><a href="https://darrangcollege.ac.in/code_conduct.php" className="hover:text-yellow-400 transition-colors">Code of Conduct</a></li>
              <li><a href="https://darrangcollege.ac.in/alumnifeedbackform.php" className="hover:text-yellow-400 transition-colors">Alumni Feedback</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center">
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMTSGggpDMMjQJHPzcmslNQDCbjzpLTvXXxXclRZwwFPqmFRMfVNpPpjRxrxzkwXNdCnsvb" className="hover:text-yellow-400 transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  darrangcollege@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                03712-225410
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                03712-220014
              </div>
              <div className="flex space-x-4 mt-4">
                {/* Social Icons */}
                <a href="https://www.facebook.com/darrangcollegepage/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 
                      0 1.333v21.333C0 23.403.597 24 1.325 
                      24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 
                      1.893-4.788 4.659-4.788 1.325 
                      0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 
                      0-1.796.715-1.796 1.764v2.313h3.587l-.467 
                      3.622h-3.12V24h6.116C23.403 24 24 
                      23.403 24 22.667V1.333C24 
                      .597 23.403 0 22.675 0z"
                    />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/school/darrang-college/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 
                    0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 
                    1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 
                    4.267 5.455v6.286zM5.337 7.433c-1.144 
                    0-2.063-.926-2.063-2.065 0-1.138.92-2.063 
                    2.063-2.063 1.14 0 2.064.925 2.064 
                    2.063 0 1.139-.925 2.065-2.064 
                    2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 
                    0H1.771C.792 0 0 .774 0 
                    1.729v20.542C0 23.227.792 24 1.771 
                    24h20.451C23.2 24 24 23.227 24 
                    22.271V1.729C24 .774 23.2 0 22.222 
                    0h.003z"
                    />
                  </svg>
                </a>  
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; 2025 Darrang College Alumni Association. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Made with <span className="text-red-500">♥</span> by Manish & Himangshu
          </p>
          <p className="text-white/60 text-sm mt-2">
            CSE - Tezpur University
          </p>
        </div>  
      </div>
    </footer>
  );
};

export default Footer;
