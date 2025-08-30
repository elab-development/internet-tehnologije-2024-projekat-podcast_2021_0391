<?php
 
 namespace App\Http\Controllers;

 use App\Models\User;
 use Illuminate\Http\Request;
 use App\Http\Resources\UserResource;
 use App\Http\Resources\PodcastResource;
 use Illuminate\Support\Facades\Auth;
 use Illuminate\Support\Facades\Log;
 use App\Models\Podcast;
 use Illuminate\Support\Facades\File;
 use Illuminate\Support\Facades\Storage;
 class UserController extends Controller
 {
     

    public function index(Request $request)
    {
        try {
           

            $user = Auth::user();
            if($user->role!='admin'){
                return response()->json([
                    'error' => 'You do not have permission to view users.',
                ], 403); 
            }
            


            $users = User::whereIn('role', ['viewer', 'creator'])->get();
    
       
            return UserResource::collection($users);
    
        } catch (\Exception $e) {
          
            return response()->json([
                'message' => 'An error occurred while loading the user.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }


    
    public function creators(Request $request){
       
        try {
           

            $users = User::where('role','creator')->get();
            return UserResource::collection($users);
    
        } catch (\Exception $e) {
           
            return response()->json([
                'message' => 'An error occurred while loading the user.',
                'error' => $e->getMessage()
            ], 500); 
        }
    
    }

      public function creatorPodcasts(Request $request)
    {
       
        try{
            $perPage = $request->input('per_page', 5); 
            
            $user = Auth::user();
            if($user->role!='creator'){
                return response()->json([
                    'error' => 'You do not have permission to view podcasts.',
                ], 403); 
            }
            



            $podcasts = $user->myPodcasts()->paginate($perPage);
            return PodcastResource::collection($podcasts);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching the podcast.',
                'error' => $e->getMessage(),
            ], 500);
        }
       
    }
    




     
 }