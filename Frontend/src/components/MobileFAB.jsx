function MobileFAB() {
    return (
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-white flex items-center justify-center md:hidden active:scale-95 transition-transform z-50">
        <span className="material-symbols-outlined">
          refresh
        </span>
      </button>
    );
  }
  
  export default MobileFAB;