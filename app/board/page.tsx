import Column from "@/components/Column";

const page = () => {
    return (
        <div className="mt-4 border-1 min-h-[80vh] rounded-sm p-4">
            <h2>This is board page</h2>
            <section className="grid grid-cols-3 gap-4 h-[70vh]">
                <Column name={'todo'}/>
                <Column name={'pending'}/>
                <Column name={'done'}/>
            </section>
        </div>
    );
};

export default page;