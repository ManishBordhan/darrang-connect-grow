"use client";
import { useAppDispatch, useAppSelector } from "@/hook";
import { checkAlumniStatus, submitAlumniForm } from "@/reducer/alumniSlice";
import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

// --- Icons ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-3">
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
    <path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-sky-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-sky-400"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-sky-400"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-sky-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-3 text-sky-400"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

// --- UI Components ---
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={`w-full ${className}`}>{children}</div>;
const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={`${className}`}>{children}</div>;
const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => <h1 className={`${className}`}>{children}</h1>;
const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => <div className={`${className}`}>{children}</div>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`border rounded-lg px-3 py-2 w-full bg-slate-800 border-slate-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${props.className}`} />;
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} className={`font-semibold py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${props.className}`} />;
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} rows={3} className={`border rounded-lg px-3 py-2 w-full bg-slate-800 border-slate-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 ${props.className}`} />;

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-300 mb-1.5">
    <span className="text-red-500 font-bold mr-1">*</span>{children}
  </label>
);

const ValidIcon = ({ isValid }: { isValid: boolean }) => isValid ? <CheckCircleIcon /> : null;

const FormField = ({ name, label, placeholder, value, onChange, error, isValid, type = "text", as = "input" }: any) => (
  <div className="space-y-1">
    <RequiredLabel>{label}</RequiredLabel>
    <div className="relative group">
      {as === 'input' ? (
        <Input type={type} name={name} placeholder={placeholder} value={value || ''} onChange={onChange} className={`pr-10 ${error ? 'border-red-500 ring-red-500' : ''}`} />
      ) : (
        <Textarea name={name} placeholder={placeholder} value={value || ''} onChange={onChange} className={`${error ? 'border-red-500 ring-red-500' : ''}`} />
      )}
      <ValidIcon isValid={isValid} />
    </div>
    {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
  </div>
);

const FileUploadField = ({ name, label, onChange, error, fileObject }: any) => {
  const handleViewClick = () => {
      if (fileObject) window.open(URL.createObjectURL(fileObject), "_blank");
  };
  return (
    <div className="space-y-2 p-4 border rounded-lg bg-slate-800/60 border-slate-700 hover:border-sky-600 transition-colors duration-300">
      <RequiredLabel>{label}</RequiredLabel>
      <div className="flex items-center gap-2">
          <Input type="file" name={name} className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-200 file:text-sky-800 hover:file:bg-sky-300 cursor-pointer ${error ? 'border-red-500' : ''}`} onChange={onChange} />
          <Button type="button" disabled={!fileObject} onClick={handleViewClick} className="bg-slate-600 hover:bg-slate-500 text-white shrink-0 disabled:bg-slate-700 disabled:text-gray-500 disabled:cursor-not-allowed">View</Button>
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

const SuccessMessage = ({ message }: { message: string }) => (
  <div className="fixed top-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-down">
    <p>{message}</p>
  </div>
);

const FormSection = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) => (
  <div className="pt-8 border-t border-slate-700/50">
      <div className="flex items-center">
        {icon}
        <h2 className="text-xl font-semibold text-gray-200">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {children}
      </div>
  </div>
);

export default function AlumniForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, success, error, alreadyFilled } = useAppSelector(state => state.alumni);

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(checkAlumniStatus());
  }, [dispatch]);

  useEffect(() => {
    if (alreadyFilled) navigate("/payment");
  }, [alreadyFilled, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    setFormData(prev => ({ ...prev, [name]: files?.[0] || value }));
  };

  const validate = useCallback(() => {
    const newErrors: any = {};
    if (formData.agree !== "Yes") newErrors.agree = "You must agree to join the association.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.father) newErrors.father = "Father's name is required.";
    if (!formData.mother) newErrors.mother = "Mother's name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.batch_hs) newErrors.batch_hs = "Batch H.S. is required.";
    if (!formData.batch_degree) newErrors.batch_degree = "Batch Degree is required.";
    if (!formData.stream) newErrors.stream = "Stream is required.";
    if (!formData.course) newErrors.course = "Course is required.";
    if (!formData.subject) newErrors.subject = "Subject/Department is required.";
    if (!formData.year_passing) newErrors.year_passing = "Year of passing is required.";
    if (!formData.status) newErrors.status = "Present status is required.";
    if (!formData.photo) newErrors.photo = "A passport size photo is required.";
    if (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar)) newErrors.aadhaar = "A valid 12-digit Aadhaar number is required.";
    if (!formData.aadhaar_doc) newErrors.aadhaar_doc = "Aadhaar document upload is required.";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = "A valid PAN number is required.";
    if (!formData.pan_doc) newErrors.pan_doc = "PAN document upload is required.";
    if (!formData.signature_doc) newErrors.signature_doc = "A signature file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const isFormStarted = Object.keys(formData).length > 0;
  const isFormValid = isFormStarted && Object.keys(errors).length === 0;

  useEffect(() => {
    if (isFormStarted) validate();
  }, [formData, isFormStarted, validate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    dispatch(submitAlumniForm(payload));
  };

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => navigate("/payment"), 2000);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 py-10 px-4 sm:px-6 lg:px-8" style={{backgroundImage: "radial-gradient(circle at top right, rgb(15 23 42 / 0.4), transparent), radial-gradient(circle at 80% 20%, rgb(8 145 178 / 0.2), transparent)"}}>
        {showSuccess && <SuccessMessage message="Form submitted successfully!" />}
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <Link to="/" className="flex items-center text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors">
                    <ArrowLeftIcon />
                    Back to Darrang College Website
                </Link>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 mb-8 shadow-2xl backdrop-blur-sm">
                <div className="flex justify-center items-center text-sky-400 mb-4">
                    <GraduationCapIcon />
                    <h2 className="text-2xl font-bold text-gray-100">Darrang College Alumni Association</h2>
                </div>
                 <div className="text-left max-w-4xl mx-auto text-gray-300 space-y-3">
                    <p>
                      Darrang College is a leading institution of higher education in Assam. We have always been proud to be alumni of the college. Therefore, as alumnus of the esteemed institution we organized the “Darrang College Alumni Association” in 1985 for the development of the college.
                    </p>
                    <p>
                      The role of Alumni is a significant aspect in the development of a college. Recently, we constructed “Alumni Hall” to seat more than 250 students and organized workshops, including a Story Writing Workshop. Our cooperation during the NAAC inspection was notable.
                    </p>
                    <p className="pt-2 text-center font-semibold text-sky-400 tracking-wider">
                      YOUR COOPERATION IS A VALUABLE EXPRESSION OF YOUR COMMITMENT TO THE COLLEGE
                    </p>
                </div>
            </div>

            <Card className="w-full shadow-2xl rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-sm">
                <CardHeader className="rounded-t-2xl border-b border-slate-700 p-6">
                    <CardTitle className="text-2xl font-bold text-center text-sky-400 tracking-wider">
                        Alumni Registration Form
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        
                        <div>
                            <RequiredLabel>Do you agree to join the Alumni Association?</RequiredLabel>
                            <div className="flex items-center gap-6 mt-2">
                                {["Yes", "No"].map(val => (
                                    <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-200">
                                        <input type="radio" name="agree" value={val} checked={formData.agree === val} onChange={handleChange} className="h-4 w-4 text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500 focus:ring-offset-slate-900"/>
                                        {val}
                                    </label>
                                ))}
                            </div>
                            {errors.agree && <p className="text-xs text-red-500 mt-1">{errors.agree}</p>}
                        </div>

                        <FormSection title="Personal Information" icon={<UserIcon/>}>
                           <div className="md:col-span-2 grid md:grid-cols-3 gap-6">
                             <FormField name="name" label="Full Name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} error={errors.name} isValid={formData.name && !errors.name} />
                             <FormField name="father" label="Father's Name" placeholder="Enter father's name" value={formData.father} onChange={handleChange} error={errors.father} isValid={formData.father && !errors.father} />
                             <FormField name="mother" label="Mother's Name" placeholder="Enter mother's name" value={formData.mother} onChange={handleChange} error={errors.mother} isValid={formData.mother && !errors.mother} />
                           </div>
                           <div className="md:col-span-2">
                            <FormField name="address" label="Present Address" placeholder="Enter your full present address" as="textarea" value={formData.address} onChange={handleChange} error={errors.address} isValid={formData.address && !errors.address} />
                           </div>
                        </FormSection>

                        <FormSection title="Academic Details" icon={<BookIcon/>}>
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField name="batch_hs" label="Batch H.S." placeholder="e.g., 2015-2017" value={formData.batch_hs} onChange={handleChange} error={errors.batch_hs} isValid={formData.batch_hs && !errors.batch_hs} />
                                <FormField name="batch_degree" label="Batch Bachelors" placeholder="e.g., 2017-2020" value={formData.batch_degree} onChange={handleChange} error={errors.batch_degree} isValid={formData.batch_degree && !errors.batch_degree} />
                                <FormField name="batch_master" label="Batch Masters (if any)" placeholder="e.g., 2020-2022" value={formData.batch_master} onChange={handleChange} error={errors.batch_master} isValid={formData.batch_master && !errors.batch_master} />
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <RequiredLabel>Stream</RequiredLabel>
                                    <div className="flex items-center gap-6 mt-2">
                                        {["Arts", "Science", "Commerce"].map(val => (
                                            <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-200">
                                                <input type="radio" name="stream" value={val} checked={formData.stream === val} onChange={handleChange} className="h-4 w-4 text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500 focus:ring-offset-slate-900"/>
                                                {val}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.stream && <p className="text-xs text-red-500 mt-1">{errors.stream}</p>}
                                </div>
                                <div>
                                    <RequiredLabel>Course</RequiredLabel>
                                    <div className="flex items-center gap-6 mt-2">
                                        {["H.S.", "Bachelors", "Masters"].map(val => (
                                            <label key={val} className="flex items-center gap-2 cursor-pointer text-gray-200">
                                                <input type="radio" name="course" value={val} checked={formData.course === val} onChange={handleChange} className="h-4 w-4 text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500 focus:ring-offset-slate-900"/>
                                                {val}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                                </div>
                            </div>
                            <FormField name="subject" label="Major Subject / Department" placeholder="e.g., Physics" value={formData.subject} onChange={handleChange} error={errors.subject} isValid={formData.subject && !errors.subject} />
                            <FormField name="year_passing" label="Final Year of Passing" placeholder="e.g., 2022" type="number" value={formData.year_passing} onChange={handleChange} error={errors.year_passing} isValid={formData.year_passing && !errors.year_passing} />
                        </FormSection>

                        <FormSection title="Professional Details" icon={<BriefcaseIcon/>}>
                            <div className="space-y-3 md:col-span-2">
                                <RequiredLabel>Present Status</RequiredLabel>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                    {["Govt Service","Business","Private Service","Self Employed","Retired","Social Service","Other"].map(s => (
                                        <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                                            <input type="radio" name="status" value={s} checked={formData.status === s} onChange={handleChange} className="h-4 w-4 text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500 focus:ring-offset-slate-900"/> {s}
                                        </label>
                                    ))}
                                </div>
                                {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status}</p>}
                            </div>
                        </FormSection>

                         <FormSection title="Membership Tiers & Fees" icon={<DollarSignIcon/>}>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <p className="font-bold text-sky-400">Joining Member</p>
                                    <p className="text-2xl font-bold text-gray-200">₹500</p>
                                    <p className="text-xs text-gray-400">Yearly Renewal: ₹200</p>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <p className="font-bold text-sky-400">Life Member</p>
                                    <p className="text-2xl font-bold text-gray-200">₹5,000</p>
                                    <p className="text-xs text-gray-400">One-time payment for lifetime</p>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <p className="font-bold text-sky-400">Donor Member</p>
                                    <p className="text-2xl font-bold text-gray-200">₹10,000+</p>
                                    <p className="text-xs text-gray-400">Special recognition for your contribution</p>
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Document Upload" icon={<FileIcon/>}>
                            <FormField name="aadhaar" label="Aadhaar Number" placeholder="Enter 12-digit Aadhaar" value={formData.aadhaar} onChange={handleChange} error={errors.aadhaar} isValid={formData.aadhaar && !errors.aadhaar} />
                            <FormField name="pan" label="PAN Number" placeholder="Enter 10-digit PAN" value={formData.pan} onChange={handleChange} error={errors.pan} isValid={formData.pan && !errors.pan} />
                            <FileUploadField name="photo" label="Passport Size Photo" onChange={handleChange} error={errors.photo} fileObject={formData.photo} />
                            <FileUploadField name="aadhaar_doc" label="Aadhaar Document" onChange={handleChange} error={errors.aadhaar_doc} fileObject={formData.aadhaar_doc} />
                            <FileUploadField name="pan_doc" label="PAN Document" onChange={handleChange} error={errors.pan_doc} fileObject={formData.pan_doc} />
                            <FileUploadField name="signature_doc" label="Signature File" onChange={handleChange} error={errors.signature_doc} fileObject={formData.signature_doc} />
                        </FormSection>

                        <div className="pt-6 border-t border-slate-700/50">
                            <Button type="submit" disabled={!isFormValid || loading} className="w-full text-lg h-12 font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-700 disabled:text-gray-400 disabled:cursor-not-allowed shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transform hover:-translate-y-0.5 transition-all duration-300">
                                {loading ? <SpinnerIcon /> : "Submit & Proceed to Payment"}
                            </Button>
                            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

