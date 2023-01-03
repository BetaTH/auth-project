import Link from "next/link";

interface ModalProps {
  title: string;
  onOkPress: () => void;
}

export function Modal({ title }: ModalProps) {
  return (
    <div
      className={`w-full h-full fixed flex top-0 left-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-[0.2rem] items-center justify-center`}
    >
      <div className="w-fit h-fit p-lg bg-gray-600 rounded-[0.8rem] gap-lg flex flex-col">
        <span className="text-style-regular-xl text-gray-100 mt-[1rem]">
          {title}
        </span>
        <div className="w-full flex justify-end">
          <Link
            className="text-violet-500 text-style-regular-xl hover:underline"
            href="/login"
          >
            OK
          </Link>
        </div>
      </div>
    </div>
  );
}
