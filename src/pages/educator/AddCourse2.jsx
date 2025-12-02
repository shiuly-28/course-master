import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from "nanoid";

import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { assets } from '../../assets/assets/myassets';

const AddCourse2 = () => {
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
        lectureUrl: '',
        lectureDuration: '',
        isPreviewFree: false,
    });

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    const handleAddChapter = () => {
        const title = prompt('Enter Chapter Name:');
        if (title) {
            const newChapter = {
                chapterId: nanoid(),
                chapterTitle: title,
                chapterContent: [],
                collapsed: false,
                chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
            };
            setChapters([...chapters, newChapter]);
        }
    };

    const handleRemoveChapter = (chapterId) => {
        const filteredChapters = chapters.filter((chapter) => chapter.chapterId !== chapterId);
        setChapters(filteredChapters);
    };

    const handleToggleChapter = (chapterId) => {
        const updatedChapters = chapters.map((chapter) =>
            chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        );
        setChapters(updatedChapters);
    };

    const handleOpenLecturePopup = (chapterId) => {
        setCurrentChapterId(chapterId);
        setLectureDetails({
            lectureTitle: '',
            lectureUrl: '',
            lectureDuration: '',
            isPreviewFree: false,
        });
        setShowPopUp(true);
    };

    const handleAddLecture = () => {
        if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl || !lectureDetails.lectureDuration) {
            alert('Please fill all lecture details');
            return;
        }

        const updatedChapters = chapters.map((chapter) => {
            if (chapter.chapterId === currentChapterId) {
                return {
                    ...chapter,
                    chapterContent: [...chapter.chapterContent, { ...lectureDetails }],
                };
            }
            return chapter;
        });

        setChapters(updatedChapters);
        setShowPopUp(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
            <form className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Course Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type here"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Course Description</label>
                    <div ref={editorRef} id="editor" className="border border-gray-300 rounded p-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Course Price</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Type here"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Discount %</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Type here"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Course Thumbnail</label>
                    <div className="flex items-center space-x-4">
                        <img src={assets.file_upload_icon} alt="" className="w-12 h-12 object-cover" />
                        <input
                            type="file"
                            id="thumbnailImage"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.chapterId} className="border border-gray-300 rounded p-4 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={assets.dropdown_icon}
                                        alt=""
                                        className="w-4 h-4 cursor-pointer"
                                        onClick={() => handleToggleChapter(chapter.chapterId)}
                                    />
                                    <span className="font-semibold">
                                        {chapterIndex + 1}. {chapter.chapterTitle}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span>{chapter.chapterContent.length} Lectures</span>
                                    <img
                                        src={assets.cross_icon}
                                        alt=""
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => handleRemoveChapter(chapter.chapterId)}
                                    />
                                </div>
                            </div>
                            {!chapter.collapsed && (
                                <div className="mt-2 space-y-2">
                                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                                        <div key={lectureIndex} className="flex justify-between items-center bg-white px-3 py-2 rounded shadow">
                                            <span>
                                                {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                                                <a href={lecture.lectureUrl} target="_blank" className="text-blue-500 ml-1 underline">Link</a> - 
                                                {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                                            </span>
                                            {/* Add lecture remove functionality if needed */}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleOpenLecturePopup(chapter.chapterId)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        + Add Lecture
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddChapter}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Chapter
                    </button>
                </div>

                {showPopUp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-96 relative">
                            <img
                                onClick={() => setShowPopUp(false)}
                                src={assets.cross_icon}
                                alt=""
                                className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
                            />
                            <div>
                                <h2 className="font-semibold">Lecture Title</h2>
                                <input
                                    type="text"
                                    placeholder="Enter lecture title"
                                    value={lectureDetails.lectureTitle}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold">Duration (minutes)</h2>
                                <input
                                    type="number"
                                    value={lectureDetails.lectureDuration}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold">Lecture URL</h2>
                                <input
                                    type="text"
                                    value={lectureDetails.lectureUrl}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={lectureDetails.isPreviewFree}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                                />
                                <label>Is Preview Free?</label>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddLecture}
                                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                            >
                                Add Lecture
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg font-semibold"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse2;
