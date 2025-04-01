export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b p-8">
      <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-8">Board App에 오신 것을 환영합니다!</h1>

      <div className="flex space-x-6">
        <a href="https://github.com/tjdanqkr/ko-board" className="px-6 py-3 bg-white text-blue-500 rounded-full font-semibold shadow-lg hover:bg-blue-100 transition">
          프론트엔드 GitHub
        </a>
        <a href="https://github.com/tjdanqkr/ko-board" className="px-6 py-3 bg-white text-blue-500 rounded-full font-semibold shadow-lg hover:bg-blue-100 transition">
          백엔드 GitHub
        </a>
      </div>
    </div>
  );
}
