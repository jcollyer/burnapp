class HrmSessionsController < ApplicationController

  def index
    @hrm_sessions = HrmSession.all
    render json: @hrm_sessions
  end

  def show
    @hrm_session = HrmSession.find(params[:id])
    render json: @hrm_session
  end
end


# class HrmSessionsController < ApplicationController

#   # GET /hrm_sessions
#   # GET /hrm_sessions.json
#   def index
#     @hrm_sessions = HrmSession.all.order(params[:created_at])
#   end

#   # GET /hrm_sessions/1
#   # GET /hrm_sessions/1.json
#   def show
#   end

#   # GET /hrm_sessions/new
#   def new
#     @hrm_session = HrmSession.new
#   end

#   # GET /hrm_sessions/1/edit
#   def edit
#   end

#   # POST /hrm_sessions
#   # POST /hrm_sessions.json
#   def create
#     @hrm_session = HrmSession.new(hrm_session_params)

#     respond_to do |format|
#       if @hrm_session.save
#         format.html { redirect_to @hrm_session, notice: 'hrm_session was successfully created.' }
#         format.json { render action: 'show', status: :created, location: @hrm_session }
#       else
#         format.html { render action: 'new' }
#         format.json { render json: @hrm_session.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # PATCH/PUT /hrm_sessions/1
#   # PATCH/PUT /hrm_sessions/1.json
#   def update
#     respond_to do |format|
#       if @hrm_session.update(hrm_session_params)
#         format.html { redirect_to @hrm_session, notice: 'hrm_session was successfully updated.' }
#         format.json { head :no_content }
#       else
#         format.html { render action: 'edit' }
#         format.json { render json: @hrm_session.errors, status: :unprocessable_entity }
#       end
#     end
#   end

#   # DELETE /hrm_sessions/1
#   # DELETE /hrm_sessions/1.json
#   def destroy
#     @hrm_session.destroy
#     respond_to do |format|
#       format.html { redirect_to hrm_sessions_url }
#       format.json { head :no_content }
#     end
#   end

#   private
#     # Use callbacks to share common setup or constraints between actions.
#     def set_hrm_session
#       @hrm_session = HrmSession.find(params[:id])
#     end

#     # Never trust parameters from the scary internet, only allow the white list through.
#     def hrm_session_params
#       params.require(:hrm_session).permit(:user_id, :duration, :created_at)
#     end
# end
