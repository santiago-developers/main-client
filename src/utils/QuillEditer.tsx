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
		input.addEventListener("change", async () => {
			const file = input.files;
			const formData = new FormData();
			if (file) {
				formData.append("file", file[0]);
			}
			if (quillRef.current) {
				const fetchData: ImageProps = await SantiagoImagePost(formData);
				const url = fetchData.url;
				console.log(fetchData.id);
				// setImgUrlIds([fetchData.id]);
				// // setImgUrlIds([...imgUrlIds,fetchData.id])
				setImgUrlIds((prevImgUrlIds) => [...prevImgUrlIds, fetchData.id]);
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, "image", url);
				editor.setSelection(range.index + 1);
			}
		});
	
	};

	useEffect(() => {
		setImageId(imgUrlIds);
		console.log("이미지useEffect", imgUrlIds);
	}, [imgUrlIds]);

	const modules = useMemo(
		() => ({
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
