import dynamic from "next/dynamic";


const QuillWrapper = dynamic(() => import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

//normal: 16px
const modules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		[
			"bold",
			"italic",
			"underline",
			"strike",
			"blockquote",
			{
				color: [
					"#000000",
					"#e60000",
					"#ff9900",
					"#ffff00",
					"#008a00",
					"#0066cc",
					"#9933ff",
					"#ffffff",
					"#facccc",
					"#ffebcc",
					"#ffffcc",
					"#cce8cc",
					"#cce0f5",
					"#ebd6ff",
					"#bbbbbb",
					"#f06666",
					"#ffc266",
					"#ffff66",
					"#66b966",
					"#66a3e0",
					"#c285ff",
					"#888888",
					"#a10000",
					"#b26b00",
					"#b2b200",
					"#006100",
					"#0047b2",
					"#6b24b2",
					"#444444",
					"#5c0000",
					"#663d00",
					"#666600",
					"#003700",
					"#002966",
					"#3d1466",
				],
			},
		],
		[
			{ align: [] },
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
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

export default function QuillEditer() {
	return (
		<QuillWrapper
			modules={modules}
			formats={formats}
			theme="snow"
			placeholder="Please enter your content"
		/>
	);
}
