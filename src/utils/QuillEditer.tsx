import { useRef, useMemo, useState, useEffect } from "react";
import tw from "twin.macro";
import { SantiagoImagePost } from "lib/fetchData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillNoSSRWrapper from "./reactQuill/QuillNoSSRWrapper";
import writeStore from "store/writeStore";

type ImageProps = {
	url: string;
	id: string;
};

export default function QuillEditer({ value, setContent }) {
	const { setImageId } = writeStore();
	const quillRef = useRef<ReactQuill>(null);
	const [imgUrlIds, setImgUrlIds] = useState<string[]>([]);

	const imageHandler = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
		input.onchange = async () => {
			const file: any = input.files ? input.files[0] : null;
			if (!file) return;
			const formData = new FormData();
			formData.append("file", file);
			let quillObj = quillRef.current.getEditor();
			const range = quillObj?.getSelection();
			const fetchData: ImageProps = await SantiagoImagePost(formData);
			const ImgUrl = fetchData.url;
			console.log(fetchData.id);
			console.log("url", ImgUrl);
			quillObj?.insertEmbed(range.index, "image", ImgUrl);
			// quillObj.setSelection(range.index + 1);

			// setImageId((prevImgUrlIds) => [
			// 	...prevImgUrlIds,
			// 	fetchData.id,
			// ]);
		};
	};

	// useEffect(() => {
	// 	setImageId(imgUrlIds);
	// }, []);

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }],
					["bold", "italic", "underline", "strike", "blockquote"],
					[
						{ align: [] },
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
						{ color: [] },
					],
					["link", "image"],
					["clean"],
				],
				handlers: { image: imageHandler },
			},
			clipboard: {
				matchVisual: false,
			},
		};
	}, []);

	const formats = [
		"header",
		"font",
		"color",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"align",
	];

	return (
		<QuillNoSSRWrapper
			tw="leading-9"
			forwardedRef={quillRef}
			modules={modules}
			formats={formats}
			theme="snow"
			placeholder="Tell your story.."
			value={value || ""}
			// onChange={(e) => setContent(e)}
		/>
	);
}
