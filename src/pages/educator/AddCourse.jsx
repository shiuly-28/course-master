import React, { useEffect, useRef, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { nanoid } from "nanoid";


const AddCourse = () => {
    const quillRef = useRef(null);
    const editorRef = useRef(null);

    const [courseTitle, setCourseTitle] = useState('');
    const [coursePrice, setCoursePrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState('');
    const [chapters, setChapters] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [currentChapterId, setCurrentChapterId] = useState(null);

    const [lectureDetails, setLectureDetails] = useState({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        lectureDescription: '',
        isPreviewFree: false,
    });

    // Initialize Quill Editor manually
    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    const handleAddChapter = () => {
        const newChapter = {
            chapterId: nanoid(),
            chapterTitle: `Chapter ${chapters.length + 1}`,
            lectures: [],
        };
        setChapters([...chapters, newChapter]);
    };

    const handleAddLecture = () => {
        if (!currentChapterId) return;

        const updatedChapters = chapters.map((chapter) => {
            if (chapter.chapterId === currentChapterId) {
                return {
                    ...chapter,
                    lectures: [
                        ...chapter.lectures,
                        {
                            lectureId: uniqid(),
                            ...lectureDetails,
                        },
                    ],
                };
            }
            return chapter;
        });

        setChapters(updatedChapters);
        setLectureDetails({
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            lectureDescription: '',
            isPreviewFree: false,
        });
        setShowPopUp(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = quillRef.current.root.innerHTML;

        const newCourse = {
            id: uniqid(),
            title: courseTitle,
            price: coursePrice,
            discount,
            image,
            description,
            chapters,
        };

        console.log('Final Course Data:', newCourse);
        // Send to Backend API here
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Discount (%)"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                />

                <div ref={editorRef} className="h-60 mb-4 border rounded" />

                <div>
                    <h2 className="text-xl font-semibold mb-2">Chapters</h2>
                    {chapters.map((chapter) => (
                        <div key={chapter.chapterId} className="mb-4 p-4 border rounded">
                            <h3 className="font-semibold">{chapter.chapterTitle}</h3>
                            <ul className="pl-4">
                                {chapter.lectures.map((lecture) => (
                                    <li key={lecture.lectureId}>{lecture.lectureTitle}</li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrentChapterId(chapter.chapterId);
                                    setShowPopUp(true);
                                }}
                                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                            >
                                + Add Lecture
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddChapter}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        + Add Chapter
                    </button>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit Course
                </button>
            </form>

            {/* Lecture Pop-up */}
            {showPopUp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96 space-y-4">
                        <h2 className="text-xl font-semibold">Add Lecture</h2>
                        <input
                            type="text"
                            placeholder="Lecture Title"
                            value={lectureDetails.lectureTitle}
                            onChange={(e) =>
                                setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            value={lectureDetails.lectureDuration}
                            onChange={(e) =>
                                setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Lecture Video URL"
                            value={lectureDetails.lectureUrl}
                            onChange={(e) =>
                                setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                        />
                        <textarea
                            placeholder="Lecture Description"
                            value={lectureDetails.lectureDescription}
                            onChange={(e) =>
                                setLectureDetails({ ...lectureDetails, lectureDescription: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                        ></textarea>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={lectureDetails.isPreviewFree}
                                onChange={(e) =>
                                    setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })
                                }
                            />
                            <span>Free Preview</span>
                        </label>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowPopUp(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddLecture}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Add Lecture
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCourse;
