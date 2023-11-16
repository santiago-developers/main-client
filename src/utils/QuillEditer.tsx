import { useRef, useMemo, useState } from "react";
import { ImageResize } from "quill-image-resize-module-ts";
import tw from "twin.macro";
import { SantiagoImagePost } from "lib/fetchData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillNoSSRWrapper from "./reactQuill/QuillNoSSRWrapper";

export default function QuillEditer({ value, setContent }) {
	const quillRef = useRef<ReactQuill>(null);
	const [imgUrlIds, setImgUrlIds] = useState<string[]>([]);

	const imageHandler = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.addEventListener("change", async () => {
			const file = input.files;
			const formData = new FormData();
			if (file) {
				formData.append("file", file[0]);
			}
			if (quillRef.current) {
				const fetchData: string[] = await SantiagoImagePost(formData);
				console.log(fetchData);
				const url = fetchData.url;
				const id = fetchData.id;
				setImgUrlIds((prevImgUrlIds) => [...prevImgUrlIds, id]);
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, "image", url);
				editor.setSelection(range.index + 1);
			}
		});
	};

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }],
					["bold", "italic", "underline", "strike", "blockquote", {}],
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
			// imageResize: {
			// 	parchment: Quill.import("parchment"),
			// 	modules: ["Resize", "DisplaySize"],
			// },
			clipboard: {
				matchVisual: false,
			},
		}),
		[],
	);

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
			onChange={(e) => setContent(e)}
		/>
	);
}
