"use client";

import { LuFiles } from "react-icons/lu";
import { useState, useEffect } from "react";
import { UploadDocuemnts } from "@/firebase/firebase.config";
import { LoadButton } from "../buttons/Load-button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VeriryCompanyFiles() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<File[]>([]);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({ fileDocument: "" });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    const MAX_FILES = 5;

    if (filesList) {
      if (filesList.length > MAX_FILES) {
        alert("Solo se permiten un máximo de 5 archivos");
      }

      const filteredFiles = Array.from(filesList).filter(file => file.type === "application/pdf");
      
      const selectedFiles = filteredFiles.slice(0, MAX_FILES);
      setFiles(selectedFiles);
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  useEffect(() => {
    if (!files) return;

    let tmp = [];

    for (let i = 0; i < files.length; i++) {
      tmp.push(files[i]);
    }

    const filesDocument = tmp;
    setPreviews(filesDocument);

    if (!files.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileDocument: "Al menos subir un documento solicitado",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileDocument: "",
      }));
    }

    return () => {
      for (let i = 0; i < filesDocument.length; i++) {
        filesDocument[i];
      }
    };
  }, [files]);

  const customToasterProps = {
    duration: 2000,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errors.fileDocument) {
      return;
    }

    setLoad(true);

    const { downloadUrlsDocuments } = await UploadDocuemnts(files);

    const request = {
      downloadUrlsDocuments,
    };

    try {
      const response = await fetch("/api/verifyCompany", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (response.ok) {
        toast.success("Cuenta en estado de espera", customToasterProps);
        scrollTo(0, 0);
        router.refresh()
      } else {
        toast.error(
          "Ha ocurrido un error al enviar los documentos",
          customToasterProps
        );
      }
    } catch {
      toast.error(
        "Ha ocurrido un error al enviar los documentos",
        customToasterProps
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full mt-4">
          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:to-white">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-4">
              <section className="flex items-center space-x-1">
                {" "}
                <LuFiles className="text-lg" />
              </section>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
            </div>
            <input
              type="file"
              id="fileDocuments"
              accept=".pdf"
              className="w-32 md:w-auto mt-1 hidden"
              multiple
              required
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex overflow-x-auto w-full mt-2 h-14 space-x-2">
          {errors.fileDocument && (
            <p className="text-red-500 text-xs md:text-sm">
              {errors.fileDocument}
            </p>
          )}
          {previews.map((file, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              <p className="w-40 text-sm font-medium text-gray-700 truncate">
                {file.name}
              </p>
              <button
                type="button"
                onClick={() => handleDeleteFile(index)}
                className="ml-auto px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <section className="flex justify-end mt-5">
          {load ? (
            <LoadButton text="Enviando" />
          ) : (
            <button className="bg-custom-green p-2 text-white dark:text-white rounded-md">
              Enviar
            </button>
          )}
        </section>
      </form>
    </div>
  );
}
