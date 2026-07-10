import {
  FolderKanban,
  Plus,
  FileText,
  Sparkles,
  Users,
  Search,
  Settings,
  Clock
} from "lucide-react";


export default function Workspace() {


  const projects = [
    {
      name: "AI Marketing Campaign",
      description:
        "Create campaigns, content, and customer engagement strategies.",
      status: "Active",
    },
    {
      name: "Business AI Assistant",
      description:
        "Train and organize your custom business AI helper.",
      status: "Building",
    },
    {
      name: "Automation Blueprint",
      description:
        "Map workflows and future AI systems.",
      status: "Planning",
    }
  ];



  return (

    <div className="min-h-screen dashboard-bg p-6 md:p-10">


      <div className="max-w-7xl mx-auto">



        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">


          <div>

            <div className="flex items-center gap-3">

              <FolderKanban className="w-12 h-12 text-cyan-400"/>

              <h1 className="text-4xl font-black">
                AI Workspace
              </h1>

            </div>


            <p className="text-white/60 mt-3 max-w-xl">

              Your digital command deck for building, organizing, and launching AI projects.

            </p>


          </div>




          <button className="ai-button px-6 py-3 flex items-center gap-2">

            <Plus className="w-5 h-5"/>

            New Project

          </button>



        </div>






        {/* Workspace Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">



          <div className="ai-card rounded-2xl p-6">

            <FolderKanban className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Projects
            </p>

          </div>





          <div className="ai-card rounded-2xl p-6">

            <FileText className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Documents
            </p>

          </div>





          <div className="ai-card rounded-2xl p-6">

            <Sparkles className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              AI Creations
            </p>

          </div>






          <div className="ai-card rounded-2xl p-6">

            <Users className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-white/50">
              Workspace Members
            </p>

          </div>



        </div>







        {/* Search Bar */}


        <div className="
          glass-panel
          rounded-2xl
          p-4
          mb-10
          flex
          items-center
          gap-3
        ">


          <Search className="text-white/40"/>


          <input
            placeholder="Search projects, documents, and AI creations..."
            className="
              bg-transparent
              outline-none
              flex-1
              text-white
              placeholder-white/40
            "
          />


        </div>








        {/* Projects */}


        <h2 className="text-3xl font-bold mb-6">

          Your AI Projects

        </h2>





        <div className="grid md:grid-cols-3 gap-6">



          {projects.map((project)=>(


            <div
              key={project.name}
              className="ai-card rounded-3xl p-7"
            >



              <div className="flex justify-between items-start">


                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-400/10
                  flex
                  items-center
                  justify-center
                ">

                  <FolderKanban className="w-7 h-7 text-cyan-400"/>

                </div>




                <span className="
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  bg-white/10
                  text-cyan-300
                ">

                  {project.status}

                </span>


              </div>







              <h3 className="
                text-xl
                font-bold
                mt-6
              ">

                {project.name}

              </h3>





              <p className="
                text-white/60
                mt-3
              ">

                {project.description}

              </p>







              <div className="
                flex
                justify-between
                items-center
                mt-6
                text-sm
                text-white/50
              ">


                <div className="flex items-center gap-2">

                  <Clock className="w-4 h-4"/>

                  Recently Updated

                </div>



                <Settings className="w-5 h-5 hover:text-cyan-400 cursor-pointer"/>


              </div>



            </div>


          ))}



        </div>





      </div>


    </div>

  );

}
