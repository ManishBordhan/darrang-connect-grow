import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

export default function AlumniForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.photo) {
      newErrors.photo = "Passport size photograph is required.";
    }

    if (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = "Aadhaar number must be exactly 12 digits.";
    }

    if (!formData.aadhaar_doc) {
      newErrors.aadhaar_doc = "Aadhaar document upload is required.";
    }

    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "PAN must be in format (e.g., ABCDE1234F).";
    }

    if (!formData.pan_doc) {
      newErrors.pan_doc = "PAN document upload is required.";
    }

    if (!formData.signature_doc) {
      newErrors.signature_doc = "Signature file upload is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsValid(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      alert("Form Submitted!");
    }
  };

  const ValidIcon = ({ field }) => (
    formData[field] && !errors[field] ? (
      <CheckCircle className="inline-block text-green-600 ml-2 w-5 h-5" />
    ) : null
  );

  const ViewButton = ({ field }) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="ml-2"
      disabled={!formData[field]}
      onClick={() => {
        if (formData[field]) {
          const fileURL = URL.createObjectURL(formData[field]);
          window.open(fileURL, "_blank");
        }
      }}
    >
      View
    </Button>
  );

  const RequiredLabel = ({ children }) => (
    <span className="font-semibold text-gray-700">
      <span className="text-red-600">*</span> {children}
    </span>
  );

  const inputBaseClasses =
    "border rounded-md px-3 py-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400";

  const radioBaseClasses =
    "text-indigo-600 focus:ring-indigo-500 transition duration-200 ease-in-out hover:scale-105";

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-12 px-6 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full bg-indigo-700 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">Darrang College Alumni Association</h1>
      </div>

      <Card className="w-full max-w-4xl shadow-2xl rounded-2xl border border-gray-200 mt-20">
        <CardContent className="p-10 space-y-8">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700">
            Alumni Registration
          </h1>
           <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label><RequiredLabel>Agreement</RequiredLabel></label>
              <p className="text-gray-600 text-sm">Are you agree to join with Association to a little service for your college?</p>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="radio" name="agree" value="Yes" onChange={handleChange} className={radioBaseClasses}/> Yes
                </label>
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="radio" name="agree" value="No" onChange={handleChange} className={radioBaseClasses}/> No
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input className={inputBaseClasses} name="name" placeholder="Name of the Alumni" onChange={handleChange} />
              <Input className={inputBaseClasses} name="father" placeholder="Father's Name" onChange={handleChange} />
              <Input className={inputBaseClasses} name="mother" placeholder="Mother's Name" onChange={handleChange} />
            </div>

            <Textarea className={inputBaseClasses} name="address" placeholder="Present Address (Village, City, District, State, Pin)" onChange={handleChange} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input className={inputBaseClasses} name="batch_hs" placeholder="Batch (Year of joining) for H.S." onChange={handleChange} />
              <Input className={inputBaseClasses} name="batch_degree" placeholder="Batch (Year of joining) for Bachelors" onChange={handleChange} />
              <Input className={inputBaseClasses} name="batch_master" placeholder="Batch (Year of joining) for Masters" onChange={handleChange} />
            </div>

            <div>
              <label><RequiredLabel>Stream</RequiredLabel></label>
              <div className="flex gap-6 mt-2">
                {['Arts', 'Science', 'Commerce'].map((s) => (
                  <label key={s} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input type="radio" name="stream" value={s} onChange={handleChange} className={radioBaseClasses}/> {s}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label><RequiredLabel>Course</RequiredLabel></label>
              <div className="flex gap-6 mt-2">
                {['H.S.', 'Bachelors', 'Masters'].map((c) => (
                  <label key={c} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input type="radio" name="course" value={c} onChange={handleChange} className={radioBaseClasses}/> {c}
                  </label>
                ))}
              </div>
            </div>

            <Input className={inputBaseClasses} name="subject" placeholder="Subject/Department (for degree/Master degree)" onChange={handleChange} />
            <Input className={inputBaseClasses} name="year_passing" placeholder="Year of Passing" onChange={handleChange} />
            <Textarea className={inputBaseClasses} name="activities" placeholder="Special Activities during college life" onChange={handleChange} />

            <div>
              <label>Present Status</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {['Govt Service', 'Business', 'Private Service', 'Self Employee', 'Retired', 'Social Service', 'Other'].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input type="radio" name="status" value={status} onChange={handleChange} className={radioBaseClasses}/> {status}
                  </label>
                ))}
              </div>
            </div>

            <div className="text-gray-700 space-y-1 bg-gray-50 p-4 rounded-md border">
              <p>Joining fees: Rs. 500/- (Yearly renewal Rs. 200/-)</p>
              <p>Life Member: Rs. 5000/-</p>
              <p>Donor Member: Rs. 10000/- and above</p>
            </div>

            <div className="space-y-2 p-4 border rounded-xl bg-gray-50">
              <label><RequiredLabel>Passport Size Photograph</RequiredLabel> <ValidIcon field="photo" /></label>
              <div className="flex items-center gap-2">
                <Input className={inputBaseClasses} name="photo" type="file" accept="image/*" onChange={handleChange} />
                <ViewButton field="photo" />
              </div>
              {errors.photo && <p className="text-red-600 text-sm">{errors.photo}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 p-4 border rounded-xl bg-gray-50">
                <label><RequiredLabel>Aadhaar No.</RequiredLabel> <ValidIcon field="aadhaar" /></label>
                <Input className={inputBaseClasses} name="aadhaar" placeholder="Aadhaar No." onChange={handleChange} />
                {errors.aadhaar && <p className="text-red-600 text-sm">{errors.aadhaar}</p>}
                <div className="flex items-center gap-2">
                  <Input className={inputBaseClasses} name="aadhaar_doc" type="file" onChange={handleChange} />
                  <ViewButton field="aadhaar_doc" />
                </div>
                {errors.aadhaar_doc && <p className="text-red-600 text-sm">{errors.aadhaar_doc}</p>}
                <ValidIcon field="aadhaar_doc" />
              </div>
              <div className="space-y-2 p-4 border rounded-xl bg-gray-50">
                <label><RequiredLabel>PAN No.</RequiredLabel> <ValidIcon field="pan" /></label>
                <Input className={inputBaseClasses} name="pan" placeholder="PAN No." onChange={handleChange} />
                {errors.pan && <p className="text-red-600 text-sm">{errors.pan}</p>}
                <div className="flex items-center gap-2">
                  <Input className={inputBaseClasses} name="pan_doc" type="file" onChange={handleChange} />
                  <ViewButton field="pan_doc" />
                </div>
                {errors.pan_doc && <p className="text-red-600 text-sm">{errors.pan_doc}</p>}
                <ValidIcon field="pan_doc" />
              </div>
            </div>

            <div className="space-y-2 p-4 border rounded-xl bg-gray-50">
              <label><RequiredLabel>Full Signature</RequiredLabel> <ValidIcon field="signature_doc" /></label>
              <div className="flex items-center gap-2">
                <Input className={inputBaseClasses} name="signature_doc" type="file" accept="image/*" onChange={handleChange} />
                <ViewButton field="signature_doc" />
              </div>
              {errors.signature_doc && <p className="text-red-600 text-sm">{errors.signature_doc}</p>}
            </div>

            <Button type="submit" disabled={!isValid} className={`w-full mt-6 text-white font-semibold py-3 rounded-xl shadow-md transition ${isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}>
              Submit
            </Button>
          </form>

          <div className="mt-10 p-6 border rounded-xl bg-white shadow-sm">
            <p className="text-gray-700">
              Darrang College is a leading institution of higher education in Assam. We have always been proud to be alumni of the college. Therefore, as alumnus of the esteemed institution we organized the “Darrang College Alumni Association” in 1985 for the development of the college.
            </p>
            <p className="mt-3 text-gray-700">
              The role of Alumni is a significant aspect in the development of a college. Recently, we constructed “Alumni Hall” to seat more than 250 students and organized workshops, including a Story Writing Workshop. Our cooperation during the NAAC inspection was notable.
            </p>
            <p className="mt-3 font-semibold text-indigo-700">
              YOUR COOPERATION IS A VALUABLE EXPRESSION OF YOUR COMMITMENT TO THE COLLEGE
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}