import {useEffect, useState} from 'react'
import axios from 'axios'
import { Loader2, Pencil,X, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';

const API_URL =  "https://jsonplaceholder.typicode.com/posts"


function FetchData() {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [editingPost, setEditingPost] = useState(null);
const [submitting, setSubmitting] = useState(false);
const [title, setTitle] = useState('')

useEffect(() => {
    axios.get(`${API_URL}?_limit=5`)//READ METHOD
    .then(response => {
        setPosts(response.data);
        setError(null);
        
        toast.success("Fetched posts successfully")
    })
    .catch(err => {
        console.error("Error fetching data", err);
        toast.error("failed to load posts from the server")
    })
    .finally( () => {
        setLoading(false);
    })
},[]);

// ==========================================
// 2. CREATE (POST) with Headers and Body
// ==========================================
const handleCreatePost = (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  setSubmitting(true);

  // 1. Define your request body payload
  const requestBody = {
    title: title,
    body: "This is a placeholder body text for the post.", 
    userId: 1
  };

  // 2. Define your configuration (e.g., Auth Headers)
  const config = {
    headers: {
      'Content-Type': 'application/json',//the server parses the data correctly
      'Authorization': 'Bearer YOUR_SECRET_ACCESS_TOKEN'
    }
  };

  // 3. Pass body as the 2nd argument, config as the 3rd argument
  axios.post(API_URL, requestBody, config)//CREATING
    .then(response => {
      setPosts([response.data, ...posts]);
      setTitle('');
      toast.success("Post created successfully!");
    })
    .catch(err => {
      console.error("Error creating post:", err);
      toast.error("Failed to create the post.");
    })
    .finally(() => setSubmitting(false));
};

// ==========================================
// 3. UPDATE (PUT) with Headers and Body
// ==========================================
const handleUpdatePost = (e) => {
  e.preventDefault();
  if (!editingPost || !title.trim()) return;

  setSubmitting(true);

  const requestBody = {
    ...editingPost,
    title: title,
    updatedAt: new Date().toISOString()
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_SECRET_ACCESS_TOKEN'
    }
  };

  // axios.put follows the same signature: (url, body, config)
  axios.put(`${API_URL}/${editingPost.id}`, requestBody, config)// UPDATE
    .then(response => {
      setPosts(posts.map(post => post.id === editingPost.id ? response.data : post));
      setEditingPost(null);
      setTitle('');
      toast.success("Post updated successfully!");
    })
    .catch(err => {
      console.error("Error updating post:", err);
      toast.error("Failed to update the post.");
    })
    .finally(() => setSubmitting(false));
};

  const startEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setTitle('');
  };
  // ==========================================
  // 4. DELETE (DELETE)
  // ==========================================
  const handleDeletePost = (id) => {
    axios.delete(`${API_URL}/${id}`)//DELETE
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
        toast.success("Post deleted successfully.");
      })
      .catch(err => {
        console.error("Error deleting post:", err);
        toast.error("Could not delete the post.");
      });
  };

if (loading) {
    return (
        <div className='flex h-64 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground'/>
        </div>
    )
}

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
    
      {/* Input Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{editingPost ? 'Edit Post' : 'Create Post'}</CardTitle>
          <CardDescription>
            {editingPost ? 'Modify the details of your selected post.' : 'Add a new resource payload to your server database.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="flex gap-3 items-center">
            <div className="flex-1">
              <Input 
                type="text" 
                placeholder="Enter a descriptive post title..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingPost ? (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> Update
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Create
                  </>
                )}
              </Button>
            
              {editingPost && (
                <Button type="button" variant="outline" onClick={cancelEdit} disabled={submitting}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Data Table Display Card */}
      <Card>
        <CardHeader>
          <CardTitle>Post Records</CardTitle>
          <CardDescription>Live backend collection sync layout.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">#{post.id}</TableCell>
                      <TableCell className="font-medium max-w-sm truncate">{post.title}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => startEdit(post)}
                          disabled={submitting}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeletePost(post.id)}
                          disabled={submitting}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FetchData
